import os

from langchain_cohere import ChatCohere, CohereEmbeddings
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from dotenv import load_dotenv

IS_OPENAI_ENABLED = True


def get_embedding_function():
    if IS_OPENAI_ENABLED:
        load_dotenv()
        return OpenAIEmbeddings(model="text-embedding-3-large")
    else:
        load_dotenv()
        return CohereEmbeddings(model="embed-english-v3.0")


def get_llm():
    if IS_OPENAI_ENABLED:
        load_dotenv()
        return ChatOpenAI(model=os.getenv("OPENAI_MODEL"), temperature=0.2)
    else:
        # Fetch API key for Cohere
        load_dotenv()
        return ChatCohere(model=os.getenv("COHERE_MODEL"), temperature=0.2)

