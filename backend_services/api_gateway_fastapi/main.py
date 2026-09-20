from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="SST AI & ML Microservices Hub",
    description="Dedicated Deep Learning, Machine Learning, and Generative AI Microservices for Sindh School of Technology",
    version="1.0.0"
)

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "service": "SST AI Microservices Gateway",
        "supported_engines": ["Generative AI", "Deep Learning", "Machine Learning", "RAG"]
    }

class SocraticQuery(BaseModel):
    message: string
    courseId: Optional[str] = None
    assignmentId: Optional[str] = None

@app.post("/ai/v1/socratic-tutor")
async def socratic_tutor(query: SocraticQuery):
    # Future LLM / Socratic orchestration hook
    return {
        "reply": f"Consider this: what core principle connects your question '{query.message}' to your current coursework?",
        "guidingQuestions": [
            "How does this relate to fundamental concepts?",
            "What happens if you test the edge case?"
        ],
        "confidence": 0.98
    }

class MLPredictionQuery(BaseModel):
    studentId: str
    attendanceRate: float
    submissionCount: int
    averageQuizScore: float

@app.post("/ai/v1/ml/predict-grade")
async def predict_grade(query: MLPredictionQuery):
    # Future Scikit-Learn / XGBoost regression hook
    predicted_score = (query.attendanceRate * 0.3) + (query.averageQuizScore * 0.7)
    return {
        "predictedFinalGrade": round(predicted_score, 1),
        "predictedLetterGrade": "A" if predicted_score >= 85 else ("B" if predicted_score >= 70 else "C"),
        "atRiskStatus": predicted_score < 60
    }
