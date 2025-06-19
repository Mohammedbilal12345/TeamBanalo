import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

profile_id = '126fdc54-b034-404d-9c11-8412d5254679'

def fetch_profile_by_id(profile_id):
    response = supabase.table('profiles').select(
        'email, resume_url, skills, team_size_pref, experience_level, hackathon_type, availability'
    ).eq('id', profile_id).single().execute()
    return response.data


def update_profile_summary(user_id: str, summary: str) -> bool:
    response = supabase.table('profiles').update({"summary": summary}).eq('id', user_id).execute()
    return bool(response.data)


def fetch_hackathon_by_id(hackathon_id):
    response = supabase.table('hackathons').select(
        'id, user_id, project_description, skills_needed').execute()
    return response.data[0] if response.data else None

def fetch_user_summaries(exclude_user_id):
    response = supabase.table('profiles').select(
        'id, email,full_name,skills, summary'
    ).neq('id', exclude_user_id).execute()
    return response.data

