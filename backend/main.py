from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import tempfile
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-resume-analyzer-puce-six.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}


def analyze_resume(text):

    text = text.lower()
    text = re.sub(r'[^a-z0-9.+# ]', ' ', text)

    skills = []

    skill_keywords = {
        "React": ["react", "react.js"],
        "Python": ["python"],
        "SQL": ["sql"],
        "Firebase": ["firebase"],
        "MongoDB": ["mongodb"],
        "Java": ["java"],
        "HTML": ["html"],
        "CSS": ["css"],
        "UI/UX": ["ui", "ux", "figma"],
        "Node.js": ["node"],
        "FastAPI": ["fastapi"]
    }

    for skill, keywords in skill_keywords.items():
        for keyword in keywords:
            if keyword in text:
                skills.append(skill)
                break

    score = min(100, len(skills) * 10 + 20)

    suggestions = []

    if "github" not in text:
        suggestions.append("Add GitHub profile")

    if "aws" not in text:
        suggestions.append("Learn AWS")

    if "docker" not in text:
        suggestions.append("Learn Docker")

    if len(skills) < 6:
        suggestions.append("Add more technical skills")

    return {
        "score": score,
        "skills": skills,
        "suggestions": suggestions
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    content = await file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(content)
        temp_file.flush()

        reader = PdfReader(temp_file.name)

        text = ""

        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"

    analysis = analyze_resume(text)

    return {
        "filename": file.filename,
        "text": text[:5000],
        "analysis": analysis
    }