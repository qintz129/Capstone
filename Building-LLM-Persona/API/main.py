from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import os
from dotenv import load_dotenv
from API import system_prompt_generation, persona_description_generation, message
from rag.query_data import response_generate
from rag.populate_database import create_db

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
model = os.getenv("OPENAI_MODEL")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

class CreatePersonaRequestBody(BaseModel):
    theme: str
    profile: Dict[str, Any]

# class Message(BaseModel):
#     role: str
#     content: str

class PersonaChatRequestBody(BaseModel):
    theme: str
    context: List[message.Message]

@app.post("/create-persona")
async def create_persona(request_body: CreatePersonaRequestBody):
    theme = request_body.theme
    profile = request_body.profile
    try:
        system_prompt = system_prompt_generation.get_system_prompt(api_key, model, profile, theme)
        assistant_message = system_prompt_generation.get_assistant_message(api_key, model, system_prompt)
        description = persona_description_generation.get_persona_description(api_key, model, assistant_message)
    except Exception as e:
        return {"status": "error", "message": str(e)}

    output = {
        "description": description,
        "system_prompt": system_prompt,
        "assistant_message": assistant_message
    }
    return {"status": "success", "data": output}

@app.post("/persona-chat")
async def persona_chat(request_body: PersonaChatRequestBody):
    theme = request_body.theme
    context = request_body.context
    #  rag function
    try:
        assistant_response = response_generate(theme, context)
    except Exception as e:
        return {"status": "error", "message": str(e)}
    output = {
        "assistant_message": {
            "role": "assistant",
            "content": assistant_response
        }
    }

    return {"status": "success", "data": output}

if __name__ == "__main__":
    import uvicorn
    create_db()
    uvicorn.run(app, host="localhost", port=8000)
