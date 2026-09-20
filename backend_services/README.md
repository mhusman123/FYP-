# Sindh School of Technology (SST) - Backend & AI Microservices Architecture

This directory houses the standalone Backend, Machine Learning (ML), Deep Learning (DL), and Generative AI microservices designed to scale independently from the Next.js Frontend.

## Architecture Overview

```
backend_services/
├── api_gateway_fastapi/       # Python FastAPI High-Performance Gateway
│   ├── main.py                # Gateway Router & CORS config
│   ├── requirements.txt       # Dependencies (PyTorch, Transformers, FastAPI, LangChain)
│   └── routers/               # Microservice Router Endpoints
├── ai_genai/                  # Generative AI & LLM Systems
│   ├── socratic_tutor/        # Multi-turn pedagogical guidance agents
│   ├── autograder_agent/      # LLM rubric-based evaluation
│   └── rag_knowledge_base/    # ChromaDB / Pinecone embeddings & SST syllabus RAG
├── ml_pipelines/              # Classical & Ensemble Machine Learning
│   ├── grade_predictor/       # Student performance forecaster
│   ├── risk_classifier/       # At-risk student early warning system
│   └── recommender/           # Personalized learning path recommender
└── dl_models/                 # Deep Learning Neural Networks
    ├── essay_scoring/         # BERT/RoBERTa automated essay scoring
    ├── speech_recognition/    # Whisper pronunciation & audio analysis
    └── proctoring_vision/     # Vision models for student engagement
```

## Quick Start for AI Backend (Python)

1. Navigate to the gateway:
   ```bash
   cd backend_services/api_gateway_fastapi
   python -m venv venv
   source venv/bin/activate  # Or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

2. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

3. In the Frontend (`.env.local` on Vercel):
   ```env
   NEXT_PUBLIC_AI_SERVICE_URL="http://localhost:8000" # Or your deployed Python microservice URL
   ```
