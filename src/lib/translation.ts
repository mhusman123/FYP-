/**
 * Translation Utilities for AI Mentor Chatbot
 * Provides bilingual support (English + Urdu)
 */

export type SupportedLanguage = 'en' | 'ur';

interface TranslationRequest {
  text: string;
  source_lang: string;
  target_lang: string;
}

interface TranslationResponse {
  translatedText: string;
  language: SupportedLanguage;
}

/**
 * Detects if text contains Urdu/Arabic script
 */
export function detectLanguage(text: string): SupportedLanguage {
  // Urdu uses Arabic script (U+0600 to U+06FF)
  const urduPattern = /[\u0600-\u06FF]/;
  return urduPattern.test(text) ? 'ur' : 'en';
}

/**
 * Translates English text to Urdu using IndicTrans2 API
 * Falls back to a stub implementation if API is unavailable
 */
export async function translateToUrdu(text: string): Promise<string> {
  const apiUrl = process.env.INDICTRANS2_API_URL;

  // Stub implementation if API URL is not configured
  if (!apiUrl || apiUrl === '') {
    console.warn('[Translation] IndicTrans2 API URL not configured, using stub translation');
    return `[اردو میں ترجمہ: ${text.substring(0, 50)}...]`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source_lang: 'en',
        target_lang: 'ur',
      } as TranslationRequest),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('[Translation] Error translating to Urdu:', error);
    // Fallback to stub
    return `[اردو میں ترجمہ: ${text.substring(0, 50)}...]`;
  }
}

/**
 * Translates Urdu text to English using IndicTrans2 API
 * Falls back to a stub implementation if API is unavailable
 */
export async function translateToEnglish(text: string): Promise<string> {
  const apiUrl = process.env.INDICTRANS2_API_URL;

  // Stub implementation if API URL is not configured
  if (!apiUrl || apiUrl === '') {
    console.warn('[Translation] IndicTrans2 API URL not configured, using stub translation');
    return `[Translation: ${text.substring(0, 50)}...]`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source_lang: 'ur',
        target_lang: 'en',
      } as TranslationRequest),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('[Translation] Error translating to English:', error);
    // Fallback to stub
    return `[Translation: ${text.substring(0, 50)}...]`;
  }
}

/**
 * Main translation function that handles bidirectional translation
 */
export async function translate(
  text: string,
  targetLang: SupportedLanguage
): Promise<TranslationResponse> {
  const sourceLang = detectLanguage(text);

  // If already in target language, return as-is
  if (sourceLang === targetLang) {
    return {
      translatedText: text,
      language: targetLang,
    };
  }

  // Translate based on target language
  const translatedText =
    targetLang === 'ur' 
      ? await translateToUrdu(text)
      : await translateToEnglish(text);

  return {
    translatedText,
    language: targetLang,
  };
}
