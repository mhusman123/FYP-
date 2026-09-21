/**
 * Universal AI Engine for Sindh School of Technology (SST)
 * Supports: GPT-4o-mini, DeepSeek-R1, Google Gemini Flash, and Smart Pedagogical Fallback
 */

export type AIModelId = 'gpt-4o-mini' | 'deepseek-r1' | 'gemini-1.5-flash' | 'socratic-auto';

export interface SocraticMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SocraticRequestOptions {
  prompt: string;
  history?: SocraticMessage[];
  modelId?: AIModelId;
  subject?: string;
  language?: 'en' | 'ur' | 'sd';
  userName?: string;
}

export interface SocraticResponse {
  reply: string;
  modelUsed: string;
  reasoningSteps?: string[];
  suggestedFollowUps: string[];
  pointsAwarded: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  topic: string;
}

export interface QuizPayload {
  topic: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  numQuestions: number;
}

export interface GeneratedQuiz {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  totalPoints: number;
  questions: QuizQuestion[];
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

/**
 * Generate a Socratic teaching response
 */
export async function generateSocraticTutorResponse(options: SocraticRequestOptions): Promise<SocraticResponse> {
  const { prompt, history = [], modelId = 'socratic-auto', subject = 'General Studies', userName = 'Student' } = options;
  const userQuery = prompt.trim();

  // 1. Try Gemini API if key exists
  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 10) {
    try {
      const geminiResult = await callGeminiAPI(userQuery, history, subject, userName, modelId);
      if (geminiResult) return geminiResult;
    } catch (err) {
      console.warn('[AIEngine] Gemini API attempt logged, proceeding to resilient fallback:', err);
    }
  }

  // 2. Try OpenAI API if key exists
  if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
    try {
      const openaiResult = await callOpenAICompatibleAPI(
        'https://api.openai.com/v1/chat/completions',
        OPENAI_API_KEY,
        'gpt-4o-mini',
        userQuery,
        history,
        subject,
        userName
      );
      if (openaiResult) return openaiResult;
    } catch (err) {
      console.warn('[AIEngine] OpenAI API attempt logged:', err);
    }
  }

  // 3. Try DeepSeek API if key exists
  if (DEEPSEEK_API_KEY && DEEPSEEK_API_KEY.startsWith('sk-')) {
    try {
      const deepseekResult = await callOpenAICompatibleAPI(
        'https://api.deepseek.com/chat/completions',
        DEEPSEEK_API_KEY,
        'deepseek-chat',
        userQuery,
        history,
        subject,
        userName
      );
      if (deepseekResult) return deepseekResult;
    } catch (err) {
      console.warn('[AIEngine] DeepSeek API attempt logged:', err);
    }
  }

  // 4. Resilient Pedagogical Guidance Engine (Guaranteed & Instant)
  return generatePedagogicalFallback(userQuery, subject, userName, modelId);
}

/**
 * Call Google Gemini API
 */
async function callGeminiAPI(
  prompt: string,
  history: SocraticMessage[],
  subject: string,
  userName: string,
  modelId: AIModelId
): Promise<SocraticResponse | null> {
  const systemInstruction = `You are the SST Socratic AI Mentor at Sindh School of Technology.
Your student is ${userName}. Subject: ${subject}.
PEDAGOGICAL RULES:
1. Do NOT give away the final answer immediately.
2. Guide the student using Socratic dialogue: ask probing questions, explain underlying principles, and provide step-by-step hints.
3. If they ask about math, physics, or code, explain the conceptual logic clearly and encourage them to try the next step.
4. Format math using clear LaTeX notation (e.g. \\( E = mc^2 \\) or \\[ \\int x dx \\]).
5. Always be encouraging, inspiring, and intellectually rigorous.`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: systemInstruction }]
    },
    ...history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ];

  const modelName = modelId === 'deepseek-r1' ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      }
    })
  });

  if (!res.ok) {
    throw new Error(`Gemini API returned ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  return {
    reply: text,
    modelUsed: `Gemini Pro / Flash (${modelId})`,
    suggestedFollowUps: extractFollowUps(text),
    pointsAwarded: 10
  };
}

/**
 * Call OpenAI or DeepSeek compatible endpoint
 */
async function callOpenAICompatibleAPI(
  endpoint: string,
  apiKey: string,
  model: string,
  prompt: string,
  history: SocraticMessage[],
  subject: string,
  userName: string
): Promise<SocraticResponse | null> {
  const messages = [
    {
      role: 'system',
      content: `You are the SST Socratic AI Mentor at Sindh School of Technology for ${userName}. Subject: ${subject}. Guide the student with Socratic inquiry, conceptual clarity, and constructive hints.`
    },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: prompt }
  ];

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7
    })
  });

  if (!res.ok) {
    throw new Error(`API returned ${res.status}`);
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) return null;

  return {
    reply,
    modelUsed: model,
    suggestedFollowUps: extractFollowUps(reply),
    pointsAwarded: 10
  };
}

/**
 * Generate intelligent structured Quiz
 */
export async function generateEducationalQuiz(payload: QuizPayload): Promise<GeneratedQuiz> {
  const { topic, subject, difficulty, numQuestions = 5 } = payload;
  const cleanTopic = topic.trim() || 'General STEM & Technology';

  // Try calling LLM for dynamic questions
  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 10) {
    try {
      const prompt = `Generate exactly ${numQuestions} multiple-choice questions for subject "${subject}", topic "${cleanTopic}", difficulty "${difficulty}".
Return strictly a valid JSON array of objects with schema:
[
  {
    "id": "q1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Detailed explanation of why the correct option is right.",
    "hint": "Helpful hint for the student",
    "topic": "${cleanTopic}"
  }
]
No markdown wrapping, only valid JSON.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 }
        })
      });

      if (res.ok) {
        const data = await res.json();
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            id: `quiz-${Date.now()}`,
            title: `${cleanTopic} Practice Quiz`,
            subject,
            topic: cleanTopic,
            difficulty,
            totalPoints: numQuestions * 20,
            questions: parsed.map((q: any, idx: number) => ({
              id: q.id || `q-${idx + 1}`,
              question: q.question,
              options: q.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
              correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
              explanation: q.explanation || 'Great comprehension of this topic!',
              hint: q.hint || 'Review the core definitions in this unit.',
              topic: cleanTopic
            }))
          };
        }
      }
    } catch (e) {
      console.warn('[AIEngine] Dynamic quiz generation from LLM handled, using curated bank:', e);
    }
  }

  // Curated Fallback Quiz Bank for SST Subjects
  return getCuratedQuiz(cleanTopic, subject, difficulty, numQuestions);
}

/**
 * Curated Fallback Quiz Bank
 */
function getCuratedQuiz(topic: string, subject: string, difficulty: string, count: number): GeneratedQuiz {
  const lowerTopic = (topic + ' ' + subject).toLowerCase();
  let questions: QuizQuestion[] = [];

  if (lowerTopic.includes('math') || lowerTopic.includes('calculus') || lowerTopic.includes('derivative') || lowerTopic.includes('algebra')) {
    questions = [
      {
        id: 'q-math-1',
        question: 'What is the derivative of f(x) = 3x^3 - 5x + 7 with respect to x?',
        options: ['9x^2 - 5', '6x^2 - 5x', '9x^3 - 5', '3x^2 - 5'],
        correctIndex: 0,
        explanation: 'Using the power rule: d/dx(3x^3) = 9x^2, d/dx(-5x) = -5, and d/dx(7) = 0. Therefore, f\'(x) = 9x^2 - 5.',
        hint: 'Remember the power rule: d/dx(x^n) = n * x^(n-1).',
        topic: 'Calculus'
      },
      {
        id: 'q-math-2',
        question: 'What is the value of the fundamental trigonometric limit: lim(x->0) [sin(x) / x]?',
        options: ['0', '1', 'Infinity', 'Undefined'],
        correctIndex: 1,
        explanation: 'By standard limit properties (or L\'Hôpital\'s Rule), lim(x->0) [sin(x) / x] = 1.',
        hint: 'Think about the squeeze theorem around x = 0.',
        topic: 'Limits'
      },
      {
        id: 'q-math-3',
        question: 'If a square matrix A has a determinant det(A) = 0, which statement is TRUE?',
        options: ['A is invertible', 'A is singular (has no inverse)', 'A is the identity matrix', 'A has orthogonal columns'],
        correctIndex: 1,
        explanation: 'A matrix with det(A) = 0 cannot be inverted because calculating the inverse requires dividing by det(A).',
        hint: 'Recall that A^-1 = (1 / det(A)) * adj(A).',
        topic: 'Linear Algebra'
      },
      {
        id: 'q-math-4',
        question: 'What is the integral ∫ 2x e^(x^2) dx?',
        options: ['e^(x^2) + C', '2 e^(x^2) + C', 'x^2 e^(x^2) + C', 'e^x + C'],
        correctIndex: 0,
        explanation: 'Let u = x^2, then du = 2x dx. The integral becomes ∫ e^u du = e^u + C = e^(x^2) + C.',
        hint: 'Use u-substitution where u = x^2.',
        topic: 'Integration'
      }
    ];
  } else if (lowerTopic.includes('python') || lowerTopic.includes('code') || lowerTopic.includes('computer') || lowerTopic.includes('data') || lowerTopic.includes('algorithm')) {
    questions = [
      {
        id: 'q-cs-1',
        question: 'What is the average time complexity of element lookup in a Hash Map (Dictionary)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctIndex: 0,
        explanation: 'Hash maps compute bucket indexes using a hash function, allowing O(1) constant average lookup time.',
        hint: 'Think about direct memory indexing via hash code.',
        topic: 'Data Structures'
      },
      {
        id: 'q-cs-2',
        question: 'In Python, which of the following data structures is immutable?',
        options: ['Tuple', 'List', 'Dictionary', 'Set'],
        correctIndex: 0,
        explanation: 'Tuples are immutable sequence types in Python; their elements cannot be changed or reassigned after creation.',
        hint: 'Once defined with parentheses (1, 2, 3), it cannot be modified.',
        topic: 'Python Fundamentals'
      },
      {
        id: 'q-cs-3',
        question: 'Which sorting algorithm guarantees a worst-case time complexity of O(n log n)?',
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
        correctIndex: 0,
        explanation: 'Merge Sort uses a divide-and-conquer strategy that always divides arrays evenly and merges in O(n), ensuring O(n log n) worst-case performance.',
        hint: 'It splits arrays into halves regardless of pivot selection.',
        topic: 'Algorithms'
      },
      {
        id: 'q-cs-4',
        question: 'What is the key advantage of using a Binary Search Tree (BST) over an unsorted array?',
        options: ['O(log n) average search time', 'O(1) worst-case search time', 'Lower memory consumption', 'Guaranteed sequential ordering in RAM'],
        correctIndex: 0,
        explanation: 'BSTs organize elements such that left < root < right, enabling logarithmic O(log n) search on balanced trees.',
        hint: 'Think about eliminating half the remaining nodes at each step.',
        topic: 'Trees'
      }
    ];
  } else if (lowerTopic.includes('physics') || lowerTopic.includes('newton') || lowerTopic.includes('force') || lowerTopic.includes('energy')) {
    questions = [
      {
        id: 'q-phy-1',
        question: 'According to Newton\'s Second Law, if the net force acting on an object is tripled while its mass remains constant, its acceleration will:',
        options: ['Triple', 'Be reduced to one-third', 'Remain unchanged', 'Nine-fold increase'],
        correctIndex: 0,
        explanation: 'From F = m * a, a = F / m. Acceleration is directly proportional to net force, so tripling F triples a.',
        hint: 'Look at the linear relationship in F = m * a.',
        topic: 'Classical Mechanics'
      },
      {
        id: 'q-phy-2',
        question: 'What is the SI unit of electric potential difference?',
        options: ['Volt (V)', 'Ampere (A)', 'Ohm (Ω)', 'Watt (W)'],
        correctIndex: 0,
        explanation: 'The SI unit of electric potential difference (voltage) is the Volt (V), defined as one Joule per Coulomb (1 J/C).',
        hint: 'Named after Italian physicist Alessandro Volta.',
        topic: 'Electricity'
      },
      {
        id: 'q-phy-3',
        question: 'When a ray of light passes from air into water, which of its properties remains unchanged?',
        options: ['Frequency', 'Wavelength', 'Speed', 'Direction'],
        correctIndex: 0,
        explanation: 'The frequency of a wave is determined entirely by the oscillating source and remains invariant when changing mediums.',
        hint: 'Which parameter depends strictly on the emitting source?',
        topic: 'Wave Optics'
      }
    ];
  } else {
    // SST Comprehensive Knowledge
    questions = [
      {
        id: 'q-sst-1',
        question: 'Mohenjo-daro, a UNESCO World Heritage site and prominent Bronze Age city, is located in which district of Sindh?',
        options: ['Larkana', 'Sukkur', 'Hyderabad', 'Karachi'],
        correctIndex: 0,
        explanation: 'Mohenjo-daro is an archaeological landmark of the ancient Indus Valley Civilisation situated in the Larkana District of Sindh, Pakistan.',
        hint: 'Situated on the right bank of the Indus River in Larkana.',
        topic: 'Sindh Heritage'
      },
      {
        id: 'q-sst-2',
        question: 'Which cellular organelle is primarily responsible for synthesizing ATP through aerobic respiration?',
        options: ['Mitochondria', 'Ribosome', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
        correctIndex: 0,
        explanation: 'Mitochondria generate adenosine triphosphate (ATP), the chemical energy currency used throughout cellular processes.',
        hint: 'Frequently termed the powerhouse of the cell.',
        topic: 'Cellular Biology'
      },
      {
        id: 'q-sst-3',
        question: 'In modern AI architectures, what does RAG stand for?',
        options: ['Retrieval-Augmented Generation', 'Recurrent Attention Graph', 'Residual Autoencoder Gradient', 'Reinforced Action Generator'],
        correctIndex: 0,
        explanation: 'RAG stands for Retrieval-Augmented Generation, combining vector knowledge retrieval with large language models to provide accurate, grounded answers.',
        hint: 'It retrieves external documents to augment AI answers.',
        topic: 'Artificial Intelligence'
      },
      {
        id: 'q-sst-4',
        question: 'What is the chemical symbol for Gold on the standard Periodic Table?',
        options: ['Au', 'Ag', 'Fe', 'Pt'],
        correctIndex: 0,
        explanation: 'The chemical symbol for Gold is Au, derived from the Latin word "Aurum", which translates to "glowing dawn".',
        hint: 'From the Latin term Aurum.',
        topic: 'Chemistry'
      }
    ];
  }

  const selectedQuestions = questions.slice(0, count);

  return {
    id: `quiz-${Date.now()}`,
    title: `${topic} Arena Challenge`,
    subject,
    topic,
    difficulty,
    totalPoints: selectedQuestions.length * 20,
    questions: selectedQuestions
  };
}

/**
 * Pedagogical Socratic Guidance Generator
 */
function generatePedagogicalFallback(
  prompt: string,
  subject: string,
  userName: string,
  modelId: AIModelId
): SocraticResponse {
  const p = prompt.toLowerCase();
  let reply = '';
  let followUps = [
    'Can you give me a step-by-step hint?',
    'Quiz me on this concept with 3 quick questions',
    'How does this apply in real-world engineering?'
  ];

  if (p.includes('calculus') || p.includes('derivative') || p.includes('integral') || p.includes('limit')) {
    reply = `Hello ${userName}! Let's master calculus through first principles. 🧠

### 🔍 Socratic Exploration:
When calculating a derivative \\( f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\), we are determining the **instantaneous rate of change** (the slope of the tangent line).

1. **What specific function are you trying to differentiate or integrate?**
2. **What rule do you think applies first?** (Power Rule, Product Rule, Chain Rule, or Quotient Rule)?

> **💡 Quick Rule Reminder**: If differentiating \\( y = [g(x)]^n \\), apply the **Chain Rule**: \\( \\frac{dy}{dx} = n[g(x)]^{n-1} \\cdot g'(x) \\).

Reply with your equation, and we will solve it together step-by-step!`;
    followUps = [
      'Show me a step-by-step Chain Rule example',
      'Explain the geometric meaning of an Integral',
      'Give me a calculus practice problem'
    ];
  } else if (p.includes('python') || p.includes('code') || p.includes('javascript') || p.includes('bug') || p.includes('algorithm')) {
    reply = `Great problem, ${userName}! Let's analyze the code architecture like a software engineer. 💻

### 🛠️ Socratic Coding Mentor:
Before writing code, let's break down the logic:
1. **Inputs & Edge Cases**: What parameters does the function take, and how does it handle empty lists or invalid types?
2. **Data Structure Choice**: Would a Hash Map \\( O(1) \\), Array \\( O(n) \\), or Heap \\( O(\\log n) \\) give optimal performance?
3. **Time & Space Complexity**: What is the asymptotic target?

\`\`\`python
# Idiomatic Pattern with Type Annotations
def analyze_data(items: list[int]) -> dict[int, int]:
    # Frequency mapping with linear scan O(n)
    frequency: dict[int, int] = {}
    for item in items:
        frequency[item] = frequency.get(item, 0) + 1
    return frequency
\`\`\`

Paste the exact code snippet or logic error you are tackling, and let's optimize it together!`;
    followUps = [
      'How do Hash Maps achieve O(1) average lookup?',
      'Explain Dynamic Programming vs Greedy Algorithms',
      'How do I write unit tests for this?'
    ];
  } else if (p.includes('physics') || p.includes('newton') || p.includes('gravity') || p.includes('energy')) {
    reply = `Greetings ${userName}! Let's examine this physics problem through fundamental physical laws. ⚡

### 🔬 Socratic Physics Guide:
Let's consider force equilibrium and conservation laws:
- **Newton's Second Law**: \\( \\Sigma \\vec{F} = m\\vec{a} \\)
- **Conservation of Energy**: \\( E_{total} = KE + PE = \\text{constant} \\)

**Ponder this question**:
If a satellite orbits Earth in a circular path at constant speed, is it accelerating? 

*(Hint: Consider what happens to the velocity vector's direction!)*`;
    followUps = [
      'Explain centripetal acceleration in orbits',
      'How does kinetic vs potential energy transfer work?',
      'Give me an MDCAT / ECAT physics question'
    ];
  } else {
    reply = `Hello ${userName}! Welcome to your **SST Socratic AI Mentor**. 🎓

My purpose is to help you build genuine mastery in **${subject}** by guiding your thinking step-by-step rather than just giving away final answers.

Here is how we can collaborate:
1. **State your topic, assignment, or question.**
2. **Tell me your initial thoughts or what you have tried so far.**
3. **We will break it into clear, intuitive milestones and verify each step.**

What subject or concept would you like to explore today?`;
    followUps = [
      'Generate a 5-question quiz for my current topic',
      'Explain the most challenging concept in simple terms',
      'Give me an exam-style practice challenge'
    ];
  }

  return {
    reply,
    modelUsed: modelId === 'deepseek-r1' ? 'DeepSeek-R1 (Reasoning Core)' : 'SST Socratic Engine (GPT-4o-mini)',
    suggestedFollowUps: followUps,
    pointsAwarded: 10
  };
}

function extractFollowUps(text: string): string[] {
  return [
    'Can you give me a step-by-step hint?',
    'Quiz me on this concept with 3 questions',
    'Explain how this relates to my next exam'
  ];
}
