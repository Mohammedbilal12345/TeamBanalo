import requests
import os
from langchain_community.document_loaders import PyPDFLoader

def extract_resume_text(url: str, temp_filename: str = "temp_resume.pdf") -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(temp_filename, "wb") as f:
            f.write(response.content)
        loader = PyPDFLoader(temp_filename)
        documents = loader.load()
        resume_text = "\n".join([doc.page_content for doc in documents])
        os.remove(temp_filename)
        return resume_text
    except Exception as e:
        print(f"Error processing resume from {url}: {e}")
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        return ""
