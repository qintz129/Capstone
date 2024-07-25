from openai import OpenAI
import json
def get_gtq_answer(api_key, model, question):
    client = OpenAI(
        api_key=api_key,
    )
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "user", "content": question}
        ]
    )

    answer = response.choices[0].message.content
    return answer

# test different questions parrallelly and collect the answers

def test_gtq_answer(api_key, model, questions):
    answers = []
    for question in questions:
        answer = get_gtq_answer(api_key, model, question)
        answer = answer.replace("\n", "")
        answers.append(f"{answer}\n")
    return answers


