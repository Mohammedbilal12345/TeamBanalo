from fastapi import FastAPI, HTTPException
from supabase_client import fetch_profile_by_id, update_profile_summary
from resume_utils import extract_resume_text
from summarizer import create_summarization_chain, generate_summary

app = FastAPI()
chain = create_summarization_chain()

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

    summary = generate_summary(chain, profile, resume_text)

    # Update the summary column in Supabase
    update_result = update_profile_summary(user_id, summary)
    if not update_result:
        raise HTTPException(status_code=500, detail="Failed to update summary in database")

    return {"email": profile.get('email'), "summary": summary}
