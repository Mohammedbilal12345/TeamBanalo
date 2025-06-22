import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Supabase credentials are missing in the environment variables.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_profile_by_id(profile_id: str):
    """Fetch a user's profile by ID."""
    try:
        response = (
            supabase
            .table('profiles')
            .select('email, resume_url, skills, team_size_pref, experience_level, hackathon_type, availability')
            .eq('id', profile_id)
            .single()
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"[ERROR] Failed to fetch profile: {e}")
        return None


def update_profile_summary(user_id: str, summary: str) -> bool:
    """Update the user's summary in the profile table."""
    try:
        response = (
            supabase
            .table('profiles')
            .update({"summary": summary})
            .eq('id', user_id)
            .execute()
        )
        return bool(response.data)
    except Exception as e:
        print(f"[ERROR] Failed to update profile summary: {e}")
        return False


def fetch_hackathon_by_id(hackathon_id: str):
    """Fetch hackathon details by ID."""
    try:
        response = (
            supabase
            .table('hackathons')
            .select('id, user_id, project_description, skills_needed')
            .eq('id', hackathon_id)
            .single()
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"[ERROR] Failed to fetch hackathon: {e}")
        return None


def fetch_user_summaries(exclude_user_id: str):
    """Fetch all user summaries excluding the poster."""
    try:
        response = (
            supabase
            .table('profiles')
            .select('id, email, full_name, skills, summary')
            .neq('id', exclude_user_id)
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"[ERROR] Failed to fetch user summaries: {e}")
        return []
