import argparse
import os
from dotenv import load_dotenv

from langchain_community.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
# from langchain_community.llms.ollama import Ollama
from langchain_cohere import ChatCohere

from API.message import Message
from rag.model_switch import get_embedding_function, get_llm

DIR = os.path.dirname(__file__)
CHROMA_PATH = os.path.join(DIR, "./chroma")

PROMPT_TEMPLATE = """
Answer the question based on the following context:

{context}

---

Answer the question based on the above context in one paragraph that consists of at most five (5) sentences: {question}
"""


def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(messages: list[SystemMessage | HumanMessage | AIMessage], theme: str = None):
    # Fetch API key for Cohere
    # os.environ["COHERE_API_KEY"] = get_cohere_pass()
    load_dotenv()

    # print(query_text)
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    last_role = messages[-1].type
    if last_role != "human":
        raise AttributeError("Wrong type of the last message of the messages history.")
    query_text = messages[-1].content

    if theme is not None:
        # Search the DB.
        results = db.similarity_search_with_score(query_text, k=5, filter={"theme": theme})
    else:
        results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # Replace original question with contexts provided by the retriever added with the question.
    messages[-1].content = prompt

    # model = Ollama(model="mistral")
    model = get_llm()
    response_text = model.invoke(messages)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    sources_table_string = "| Number | File name and chunk ID | Score |\n| ----------- | ----------- | ----------- |\n"
    for i, source in enumerate(sources):
        sources_table_string += f"| {i} | {source} | {results[i][1]} |\n"
    response_text_content = response_text.content

    formatted_response = f"### Response from Cohere: \n{response_text_content} \n\n### Sources: \n{sources_table_string}"
    print(formatted_response)
    # return rag_output + formatted_response
    return response_text_content


def response_generate(theme: str, context: list[Message]):
    converted_context = []
    print(f"Theme received is: {theme}")
    for message in context:
        if message.role == "assistant":
            converted_context.append(AIMessage(content=message.content))
        elif message.role == "system":
            converted_context.append(SystemMessage(content=message.content))
        elif message.role == "user":
            converted_context.append(HumanMessage(content=message.content))
        else:
            raise AttributeError("Wrong message role included in the context.")

    return query_rag(converted_context, theme)


if __name__ == "__main__":
    main()
