from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv
import re

load_dotenv()

messages = [
    ("system", 
     "You are a matchmaking expert. Given a user summary and a hackathon description, "
     "focus on matching the specific technical skills needed for the hackathon. "
     "If the user's skills (e.g., C#, Blender, Unreal Engine) directly match those needed, rate highly. "
     "If not, rate lower. Return a matching score from 0 to 100 in percentage (100 = perfect match) and a one-sentence explanation. "
     "Be strict about skill overlap and do not recommend full stack developers unless their summary explicitly mentions the required skills."
    ),
    ("human", 
     "User summary: {user_summary}\n User Skills: {user_skills}\nHackathon: {hackathon_detail}\nScore and explain:"
    )
]


prompt_template = ChatPromptTemplate.from_messages(messages)
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
chain = prompt_template | llm | StrOutputParser()

def parse_score(llm_output):
    match = re.search(r'(\d{1,3})', llm_output)
    return int(match.group(1)) if match else 0
