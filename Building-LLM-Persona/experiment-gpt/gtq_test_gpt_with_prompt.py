import json
from openai import OpenAI

def get_gtq_answer(api_key, model, question, system_prompt):
    client = OpenAI(
        api_key=api_key,
    )
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system","content": system_prompt},
            {"role": "user", "content": question}
        ]
    )

    answer = response.choices[0].message.content
    return answer

# test different questions parrallelly and collect the answers
def test_gtq_answer(api_key, model, questions, system_prompt):
    answers = []
    for question in questions:
        answer = get_gtq_answer(api_key, model, question, system_prompt)
        answer = answer.replace("\n", "")
        answers.append(f"{answer}\n")
    return answers

