from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import tempfile
import re
import os

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

# Fix spaced letters from PDF extraction
text = text.replace("r e a c t", "react")
text = text.replace("p y t h o n", "python")
text = text.replace("f i r e b a s e", "firebase")
text = text.replace("m o n g o d b", "mongodb")
text = text.replace("j a v a", "java")
text = text.replace("h t m l", "html")
text = text.replace("c s s", "css")
text = text.replace("s q l", "sql")
text = text.replace("f i g m a", "figma")
    text = re.sub(r"[^a-z0-9.+# ]", " ", text)

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
        suggestions.append("Add GitHub Profile")

    if "aws" not in text:
        suggestions.append("Learn AWS")

    if "docker" not in text:
        suggestions.append("Learn Docker")

    if len(skills) < 6:
        suggestions.append("Add More Technical Skills")

    return {
        "score": score,
        "skills": skills,
        "suggestions": suggestions
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()

        if not content:
            return {"error": "Uploaded file is empty"}

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            temp_file.write(content)
            temp_file.flush()

            pdf_path = temp_file.name

        reader = PdfReader(pdf_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        os.remove(pdf_path)

        analysis = analyze_resume(text)

        return {
            "filename": file.filename,
            "text": text[:5000],
            "analysis": analysis
        }

    except Exception as e:
        return {
            "error": str(e)
        }
