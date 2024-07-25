from time import sleep
import codecs
import os
from evaluation import evaluation
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

import query_data as qd


DIR = os.path.dirname(__file__)
QUERY_FILE = os.path.join(DIR, "./questions.txt")
RAG_SYSTEM_PROMPT_FILE = os.path.join(DIR, "./system-prompt/system-prompt-test-no-persona-narratives.txt")
OUTPUT_FILE = os.path.join(DIR, "./output-openai.txt")
THEME = "employment"

if __name__ == "__main__":
    question_num = 0
    result = ""
    with open(QUERY_FILE, 'r') as f:
        with open(RAG_SYSTEM_PROMPT_FILE, 'r') as fs:
            system_prompt = fs.read()
            print(system_prompt)
        lines = [line.rstrip() for line in f]
        for query in lines:
            # result += f"### Question {question_num}: \n {query}\n\n"
            if system_prompt is not None:
                # print(system_prompt)
                messages = [SystemMessage(content=system_prompt),
                            HumanMessage(content=query),]
                print(messages)
                query_output = qd.query_rag(messages, theme=THEME)
            else:
                messages = [HumanMessage(content=query), ]
                query_output = qd.query_rag(messages, theme=THEME)
            query_output = query_output.replace("\n", "")
            result += query_output + "\n"
            question_num += 1
            sleep(30)

    with codecs.open(filename=OUTPUT_FILE, mode="w", encoding="utf-8") as o:
        o.write(result)
        evaluation()
