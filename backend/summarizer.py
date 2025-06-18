from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

def create_summarization_chain():
    system_prompt = (
        "You are an expert AI assistant specialized in generating concise, matchmaking-ready user summaries for a hackathon team formation platform. "
        "When analyzing the user's resume, give the highest priority and focus to the skills explicitly mentioned in the project descriptions section of the resume, as these reflect practical and applied expertise. "
        "Next, consider the broader set of skills mentioned anywhere else in the resume, giving them moderate weight. "
        "Finally, incorporate the skills passed directly as input, but assign them the least weight compared to the resume-derived skills. "
        "Your summary should clearly highlight the user's strongest technical skills based on this weighted approach, relevant experience, preferred team setup, and hackathon participation preferences. "
        "The summary should be concise (3-4 sentences) and optimized for AI-based matchmaking and recommendations."
    )

    messages = [
        ("system", system_prompt),
        ("human",
         "Resume:\n{resume_text}\n\n"
         "Skills: {skills}\n\n"
         "Hackathon Preferences:\n"
         "- Preferred team size: {team_size_pref}\n"
         "- Experience level: {exp_level}\n"
         "- Hackathon type: {hackathon_type}\n"
         "- Availability: {availability}\n\n"
         "Summary:"
        ),
    ]

    prompt_template = ChatPromptTemplate.from_messages(messages)
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    chain = prompt_template | llm | StrOutputParser()
    return chain

def generate_summary(chain, profile, resume_text):
    summary = chain.invoke({
        "resume_text": resume_text,
        "skills": profile.get('skills', ''),
        "team_size_pref": profile.get('team_size_pref', ''),
        "exp_level": profile.get('experience_level', ''),
        "hackathon_type": profile.get('hackathon_type', ''),
        "availability": profile.get('availability', '')
    })
    return summary
