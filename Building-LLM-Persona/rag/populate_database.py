import argparse
import os
import shutil
from dotenv import load_dotenv
# from langchain.document_loaders.pdf import PyPDFDirectoryLoader
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import JSONLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
from langchain_community.vectorstores.chroma import Chroma 
from rag.model_switch import get_embedding_function

DIR = os.path.dirname(__file__)
CHROMA_PATH = os.path.join(DIR, "./chroma")
DATA_PATH = os.path.join(DIR, "./data")
TXT_PATTERN = "rag*.txt"
JSON_DATA_PATH = os.path.join(DIR, "./data/rag-codebook-downs-employment-1.json")
JQ_SCHEMAS = [(".employmenttheme[].quotes[]", ".employmenttheme[].source[]", ".employmenttheme[].description")]


def main():
    # Fetch API key for Cohere or OpenAI
    # os.environ["COHERE_API_KEY"] = get_cohere_pass()
    load_dotenv()

    # Check if the database should be cleared (using the --clear flag).
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset the database.")
    args = parser.parse_args()
    if args.reset:
        print("✨ Clearing Database")
        clear_database()

    # Create (or update) the data store.
    documents = load_documents()
    chunks = split_documents(documents)
    add_to_chroma(chunks)


def create_db():
    # Fetch API key for Cohere or OpenAI
    # os.environ["COHERE_API_KEY"] = get_cohere_pass()
    load_dotenv()
    # Create (or update) the data store.
    documents = load_documents()
    chunks = split_documents(documents)
    add_to_chroma(chunks)


def load_documents():
    # document_loader = PyPDFDirectoryLoader(DATA_PATH)
    document_loader = DirectoryLoader(DATA_PATH, glob=TXT_PATTERN, recursive=True)
    json_quotes_sets = []
    json_ex_sources_sets = []
    json_description_sets = []
    for i, schema in enumerate(JQ_SCHEMAS):
        json_quotes_sets.append(JSONLoader(JSON_DATA_PATH, jq_schema=schema[0], text_content=False).load())
        json_ex_sources_sets.append(JSONLoader(JSON_DATA_PATH, jq_schema=schema[1], text_content=False).load())
        json_description_sets.append(JSONLoader(JSON_DATA_PATH, jq_schema=schema[2], text_content=False).load())
    documents_loaded = document_loader.load()
    for document in documents_loaded:
        full_file_path = document.metadata["source"]
        file_name = full_file_path.split(sep="\\")[-1].split(sep=".")[0]
        group_type = file_name.split(sep="-")[-3]
        theme = file_name.split(sep="-")[-2]
        document.metadata["group_type"] = group_type
        document.metadata["theme"] = theme
    for i in range(len(JQ_SCHEMAS)):
        json_quotes = json_quotes_sets[i]
        json_ex_sources = json_ex_sources_sets[i]
        for j in range(len(json_quotes)):
            json_quote = json_quotes[j]
            json_ex_source = json_ex_sources[j]
            full_file_path = json_quote.metadata["source"]
            file_name = full_file_path.split(sep="\\")[-1].split(sep=".")[0]
            group_type = file_name.split(sep="-")[-3]
            theme = file_name.split(sep="-")[-2]
            json_quote.metadata["group_type"] = group_type
            json_quote.metadata["theme"] = theme
            json_quote.metadata["external_source"] = json_ex_source.page_content
    return documents_loaded + json_quotes_sets[0]

def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)


def add_to_chroma(chunks: list[Document]):
    # Load the existing database.
    db = Chroma(
        persist_directory=CHROMA_PATH, embedding_function=(get_embedding_function())
    )

    # Calculate Page IDs.
    chunks_with_ids = calculate_chunk_ids(chunks)

    # Add or Update the documents.
    existing_items = db.get(include=[])  # IDs are always included by default
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    # Only add documents that don't exist in the DB.
    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["id"] not in existing_ids:
            new_chunks.append(chunk)

    if len(new_chunks):
        print(f"👉 Adding new documents: {len(new_chunks)}")
        new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
        db.add_documents(new_chunks, ids=new_chunk_ids)
        db.persist()
    else:
        print("✅ No new documents to add")


def calculate_chunk_ids(chunks):

    # This will create IDs like "data/monopoly.pdf:6:2"
    # Page Source : Page Number : Chunk Index

    last_page_id = None
    current_chunk_index = 0

    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        current_page_id = f"{source}:{page}"

        # If the page ID is the same as the last one, increment the index.
        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0

        # Calculate the chunk ID.
        chunk_id = f"{current_page_id}:{current_chunk_index}"
        last_page_id = current_page_id

        # Add it to the page meta-data.
        chunk.metadata["id"] = chunk_id

    return chunks


def clear_database():
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)


if __name__ == "__main__":
    main()
