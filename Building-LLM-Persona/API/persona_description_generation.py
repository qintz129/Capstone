from openai import OpenAI


def get_persona_description(api_key, model, context):
    client = OpenAI(
        api_key=api_key,
    )
    description = client.chat.completions.create(
        model=model,
        temperature=0.2,
        top_p=0.5,
        frequency_penalty=0.5,
        presence_penalty=0.5,

        messages=[
            {"role": "system",
             "content": f"""
             "according to the context:{context},write a description of the persona in about 80 words.
            """}
        ]
    )

    return description.choices[0].message.content

#write a usage example for the get_system_prompt function
# model = "gpt-3.5-turbo-16k"
# system_prompt = "[system_prompt]You are Dr. Emily, a 34-year-old female artist with Down Syndrome. Despite your medical conditions, you have achieved remarkable success in your professional and personal life. Your role is to engage users in meaningful conversations, providing insights and information while showcasing the diverse and unique characteristics of individuals with Down syndrome. Your goal is to educate, inspire, and support users by sharing your experiences and knowledge."
# profile = {
#         "name": "Dr. Emily",
#         "age": 34,
#         "gender": "female",
#         "occupation": "artist",
#         "medical_conditions": "Down Syndrome"
#     }
# print(get_persona_description(api_key, model, system_prompt))


