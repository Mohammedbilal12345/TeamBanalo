from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import ast

# Import from your existing modules
from recommender import chain as recommender_chain, parse_score
from summarizer import create_summarization_chain, generate_summary
from resume_utils import extract_resume_text
from supabase_client import (
    fetch_profile_by_id,
    update_profile_summary,
    fetch_hackathon_by_id,
    fetch_user_summaries,
)

# === Initialize FastAPI App ===
app = FastAPI()

# === Setup CORS (for frontend requests) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with actual frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Initialize LLM Chains ===
summary_chain = create_summarization_chain()
recommend_chain = recommender_chain

# === Route 1: Generate Summary from Resume ===
@app.get("/generate-summary/{user_id}")
async def generate_summary_endpoint(user_id: str):
    profile = fetch_profile_by_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    resume_url = profile.get('resume_url')
    if not resume_url:
        raise HTTPException(status_code=400, detail="No resume URL provided")

    resume_text = extract_resume_text(resume_url, f"temp_resume_{user_id}.pdf")
    if not resume_text:
        raise HTTPException(status_code=400, detail="Failed to extract resume text")

    summary = generate_summary(summary_chain, profile, resume_text)

    update_result = update_profile_summary(user_id, summary)
    if not update_result:
        raise HTTPException(status_code=500, detail="Failed to update summary in database")

    return {"email": profile.get('email'), "summary": summary}

# === Route 2: Recommend Team Mates ===
class RecommendationRequest(BaseModel):
    hackathon_id: str
    poster_id: str

@app.post("/recommend-team-mates")
async def recommend_team_mates_api(req: RecommendationRequest):
    hackathon = fetch_hackathon_by_id(req.hackathon_id)
    if not hackathon:
        raise HTTPException(status_code=404, detail="Hackathon not found")
    
    skills = hackathon['skills_needed']
    if isinstance(skills, str):
        try:
            skills_list = ast.literal_eval(skills)
            if isinstance(skills_list, list):
                skills = ', '.join(skills_list)
            else:
                skills = str(skills)
        except Exception:
            skills = str(skills)

    hackathon_text = (
        f"{hackathon['project_description']} "
        f"Skills needed: {skills}. "
    )

    users = fetch_user_summaries(exclude_user_id=req.poster_id)
    if not users:
        raise HTTPException(status_code=404, detail="No users found")

    results = []
    for user in users:
        user_summary = user['summary']
        user_skills = user['skills']
        llm_output = recommend_chain.invoke({
            "user_summary": user_summary,
            "user_skills": user_skills,
            "hackathon_detail": hackathon_text
        })
        score = parse_score(llm_output)
        results.append({
            "user_id": user['id'],
            "email": user['email'],
            "score": score,
            "explanation": llm_output
        })

    results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)
    return {"recommendations": results_sorted}
