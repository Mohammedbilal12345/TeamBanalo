from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

# --- Step 1: Load and extract text from PDF resume ---
pdf_path = "backend/Musharraf-Stirring Minds.pdf"  # Replace with actual PDF path
loader = PyPDFLoader(pdf_path)
documents = loader.load()
resume_text = "\n".join([doc.page_content for doc in documents])

# --- Step 2: Define prompt template with system and human messages ---
system_prompt = (
    "You are an expert AI assistant specialized in generating concise, matchmaking-ready user summaries for a hackathon team formation platform. "
    "When analyzing the user's resume, give the highest priority and focus to the skills explicitly mentioned in the project descriptions section of the resume, as these reflect practical and applied expertise. "
    "Next, consider the broader set of skills mentioned anywhere else in the resume, giving them moderate weight. "
    "Finally, incorporate the skills passed directly as input, but assign them the least weight compared to the resume-derived skills. "
    "Your summary should clearly highlight the user's strongest technical skills based on this weighted approach, relevant experience, preferred team setup, and hackathon participation preferences. "
    "The summary should be concise (3-4 sentences) and optimized for AI-based matchmaking and recommendations."
)


messages = [
    ("system",
    system_prompt
    ),
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

# --- Step 3: Initialize Gemini chat model ---
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")  # or "gemini-2.0-flash"

# --- Step 4: Compose chain ---
chain = prompt_template | llm | StrOutputParser()

# --- Step 5: Example user data ---
skills = "React, Python, Node.js, JavaScript, TypeScript, MongoDB, PostgreSQL, GraphQL, Data Science, Docker"
team_size_pref = "4-5"
exp_level = "Intermediate"
hackathon_type = "Virtual"
availability = "Weekdays"

# --- Step 6: Run the chain ---
summary = chain.invoke({
    "resume_text": resume_text,
    "skills": skills,
    "team_size_pref": team_size_pref,
    "exp_level": exp_level,
    "hackathon_type": hackathon_type,
    "availability": availability
})

print("Generated Summary:\n", summary)
