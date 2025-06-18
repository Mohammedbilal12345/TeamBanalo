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
