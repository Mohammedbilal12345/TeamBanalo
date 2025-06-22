# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from recommender import chain, parse_score
# from supabase_client import fetch_hackathon_by_id, fetch_user_summaries
# from fastapi.middleware.cors import CORSMiddleware
# import ast

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Or replace with your frontend URL for better security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class RecommendationRequest(BaseModel):
#     hackathon_id: str
#     poster_id: str

# @app.post("/recommend-team-mates")
# async def recommend_team_mates_api(req: RecommendationRequest):
#     hackathon = fetch_hackathon_by_id(req.hackathon_id)
#     if not hackathon:  # Now checks for None instead of empty list
#         raise HTTPException(status_code=404, detail="Hackathon not found")
    
#     skills = hackathon['skills_needed']
#     if isinstance(skills, str):
#         try:
#             skills_list = ast.literal_eval(skills)
#             if isinstance(skills_list, list):
#                 skills = ', '.join(skills_list)
#             else:
#                 skills = str(skills)
#         except Exception:
#             skills = str(skills)

#     # Access fields directly from hackathon dict
#     hackathon_text = (
#         f"{hackathon['project_description']} "
#         f"Skills needed: {skills}. "

#     )

#     users = fetch_user_summaries(exclude_user_id=req.poster_id)
#     if not users:
#         raise HTTPException(status_code=404, detail="No users found")

#     results = []
#     for user in users:
#         user_summary = user['summary']
#         user_skills = user['skills']
#         llm_output = chain.invoke({
#             "user_summary": user_summary,
#             "user_skills": user_skills,
#             "hackathon_detail": hackathon_text
#         })
#         score = parse_score(llm_output)
#         results.append({
#             "user_id": user['id'],
#             "email": user['email'],
#             "score": score,
#             "explanation": llm_output
#         })

#     results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)
#     return {"recommendations": results_sorted}

