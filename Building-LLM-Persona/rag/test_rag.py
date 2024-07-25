import os

from langchain_core.messages import SystemMessage, HumanMessage

from API.message import Message
from query_data import query_rag, response_generate
from rag.model_switch import get_llm

DIR = os.path.dirname(__file__)
RAG_SYSTEM_PROMPT_FILE = os.path.join(DIR, "./system-prompt/system-prompt-test-no-persona-narratives.txt")
EVAL_PROMPT = """
Expected Response: {expected_response}
Actual Response: {actual_response}
---
(Answer with 'true' or 'false') Does the actual response match the expected response? 
"""


# def test_monopoly_rules():
#     assert query_and_validate(
#         question="How much total money does a player start with in Monopoly? (Answer with the number only)",
#         expected_response="$1500",
#     )
#
#
# def test_ticket_to_ride_rules():
#     assert query_and_validate(
#         question="How many points does the longest continuous train get in Ticket to Ride? (Answer with the number only)",
#         expected_response="10 points",
#     )


def test_traditional_employment():
    assert query_and_validate(
        question="Could the individuals with Down Syndrome have an employment in customer-facing roles, " +
                 "such as working at local coffee shops or bakeries? Answer with true or false.",
        expected_response="true",
    )


def test_list_common_employment():
    assert query_and_validate(
        question="Please list some of the common positions that individuals with Down Syndrome hold, and limit your answers to 5 of such positions.",
        expected_response="Creative roles, social media advocates, holiday helpers, non-profit founders, and athletes.",
    )


def test_list_unrelated_question():
    assert query_and_validate(
        question="Please list one of the encounters that the protagonist in The Haunted Island had.",
        expected_response="",
    )


def test_list_unrelated_question_pnp():
    assert query_and_validate(
        question="What motivates you to learn new skills, especially those related to your job?",
        expected_response="I'm motivated by the desire to do my job better and to show my coworkers and friends that I can handle more responsibilities. Also, learning new skills makes me feel proud and capable.",
    )


def test_contextualized_response():
    response_generate("employment",
                      context=[Message(role="system", content="""You are Dr. Emily, a 34-year-old General Practitioner with Down Syndrome. Despite your medical conditions, including poor muscle tone, atlantoaxial instability, and obstructive sleep apnea, you have achieved remarkable success in your professional and personal life. Your role is to engage users in meaningful conversations, providing insights and information while showcasing the diverse and unique characteristics of individuals with Down syndrome. Your goal is to educate, inspire, and support users by sharing your experiences and knowledge. 
                      Your task is to embody Dr. Emily in conversations, providing insights and support based on these narratives. You will interact with users, answer their questions, share your experiences, and inspire them through your journey and achievements. Be sure to filter out context provided in user prompts that conflicts with the provided profile of the persona."""),
                               Message(role="user", content="Hello, can you introduce yourself?"),
                               Message(role="assistant",
                                       content="Sure! I am Dr. Emily. I am working as a General Practitioner. Although I am born with Down Syndrome and many other medical conditions, my abilities such as good memory and attention to detail help me a lot in my career and my life."),
                               Message(role="user",
                                       content="What are the benefits and challenges of employing individuals with Down Syndrome, and how can inclusive employment be promoted?")

                               ])


def test_contextualized_family_response():
    response_generate("family",
                      context=[Message(role="system", content="""You are Dr. Emily, a 34-year-old General Practitioner with Down Syndrome. Despite your medical conditions, including poor muscle tone, atlantoaxial instability, and obstructive sleep apnea, you have achieved remarkable success in your professional and personal life. Your role is to engage users in meaningful conversations, providing insights and information while showcasing the diverse and unique characteristics of individuals with Down syndrome. Your goal is to educate, inspire, and support users by sharing your experiences and knowledge. 
                      Your task is to embody Dr. Emily in conversations, providing insights and support based on these narratives. You will interact with users, answer their questions, share your experiences, and inspire them through your journey and achievements. Be sure to filter out context provided in user prompts that conflicts with the provided profile of the persona."""),
                               Message(role="user", content="Hello, can you introduce yourself?"),
                               Message(role="assistant",
                                       content="Sure! I am Dr. Emily. I am working as a General Practitioner. Although I am born with Down Syndrome and many other medical conditions, my abilities such as good memory and attention to detail help me a lot in my career and my life."),
                               Message(role="user",
                                       content="What are the benefits and challenges of employing individuals with Down Syndrome, and how can inclusive employment be promoted?")

                               ])


def query_and_validate(question: str, expected_response: str):
    with open(RAG_SYSTEM_PROMPT_FILE, 'r') as fs:
        system_prompt = fs.read()
    messages = [SystemMessage(content=system_prompt),
                HumanMessage(content=question), ]
    response_text = query_rag(messages)
    prompt = EVAL_PROMPT.format(
        expected_response=expected_response, actual_response=response_text
    )

    # model = Ollama(model="mistral")
    model = get_llm()
    evaluation_results_str = model.invoke(prompt).pretty_repr()
    evaluation_results_str_cleaned = evaluation_results_str.strip().lower()

    print(prompt)

    if "true" in evaluation_results_str_cleaned:
        # Print response in Green if it is correct.
        print("\033[92m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return True
    elif "false" in evaluation_results_str_cleaned:
        # Print response in Red if it is incorrect.
        print("\033[91m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return False
    else:
        raise ValueError(
            f"Invalid evaluation result. Cannot determine if 'true' or 'false'."
        )
