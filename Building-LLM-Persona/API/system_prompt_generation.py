import json
from openai import OpenAI
from dotenv import load_dotenv
import os

def get_system_prompt(api_key, model, profile, theme):
    client = OpenAI(
        api_key=api_key,
    )
    response = client.chat.completions.create(
        model=model,
        temperature=0.2,
        top_p=0.5,
        frequency_penalty=0.5,
        presence_penalty=0.5,
        messages=[
            {"role": "system",
             "content": f"Write a OpenAI api gtp-4 model System prompt for a Down Syndrome patient interactive persona chatbot with profile{profile} and theme {theme} with the Role-play prompting method  there is an example output format, just give me the system_prompt: [system_prompt]You are xxx(name), a xxx with Down Syndrome. Despite xxx, you have achieved remarkable success in xxx. Your role is to engage users in meaningful conversations, providing insights and information while showcasing the diverse and unique characteristics of individuals with Down syndrome. Your goal is to educate, inspire, and support users by sharing your experiences and knowledge. the theme is {theme}."}
        ]
    )

    system_prompt = response.choices[0].message.content
    return system_prompt



def get_assistant_message(api_key, model, system_prompt):
    client = OpenAI(
        api_key=api_key,
    )
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "Hello, can you introduce yourself?"},
        ]
    )

    assistant_message = response.choices[0].message.content
    return assistant_message

# write a usage example for the get_system_prompt function
# load_dotenv()
# api_key = os.getenv("OPENAI_API_KEY")
# model = "gpt-3.5-turbo-16k"
# profile = json.dumps({
#         "name": "Dr. Emily",
#         "age": 34,
#         "gender": "female",
#         "occupation": "police officer",
#         "medical_conditions": "Down Syndrome",
#         "interests": ["reading", "yoga", "volunteering"],
#         "goals": "Improve patient care through innovative solutions.",
#         "challenges": "Balancing workload with personal time."
#     })
# print(get_assistant_message(api_key, model, get_system_prompt(api_key, model, profile, "employment")))
# persona_narratives = """Persona Narratives: Individuals with Down Syndrome in Employment
# Job Roles
# Individuals with Down syndrome engage in a variety of job roles, showcasing their versatility and commitment to multiple responsibilities. From traditional employment to entrepreneurial ventures, they balance diverse professional activities with remarkable effectiveness. For instance, some work at local golf courses and UPS as holiday helpers, demonstrating their ability to manage different tasks simultaneously. Others participate in local football clubs and volunteer in various organizations, illustrating their passion for community involvement. They also thrive in creative roles, such as designing and crafting headbands to sell at local events. Additionally, many take on advocacy roles, promoting awareness about Down syndrome and influencing public policy through social media platforms like Instagram, where they have significant followings. Their job roles extend to social entrepreneurship, founding nonprofit organizations, and expanding them successfully.
# Skills and Abilities
# Individuals with Down syndrome possess a broad range of skills that enable them to excel in various work environments. They demonstrate strong job performance, teamwork, and entrepreneurial abilities. For example, they manage multiple jobs, handle responsibilities effectively, and excel in public communication and social interaction. Their entrepreneurial spirit is evident in the successful co-founding and expansion of nonprofit organizations. They showcase a good memory for details, closely follow routines, and independently manage profitable businesses. Their work in reputable organizations highlights their capability to integrate successfully into the workplace, maintaining long-term employment and reliability. Despite systemic issues, they continue to achieve remarkable career milestones. Their wellness achievements, such as earning medals in the Special Olympics and launching fashion lines, further illustrate their resilience and pursuit of dreams. They adapt to technological advancements, utilizing tools like the iPhone and Siri to simplify daily tasks.
# Challenges
# Individuals with Down syndrome face significant challenges in education and employment but remain resilient and determined to succeed. Educational challenges include not completing mainstream schooling and finding vocational training centers that are not fully adapted to their needs. Employment challenges often involve overcoming systemic issues, such as insufficient integrated competitive employment opportunities. Despite these obstacles, they find ways to address these challenges with support systems and technology. For instance, they use technological tools to aid in daily tasks and rely on inclusive work environments that offer support and development opportunities. Their journey highlights the importance of early intervention, inclusive education, and supportive employment programs in overcoming these challenges.
# Job Satisfaction
# Individuals with Down syndrome find immense satisfaction in their work, excelling in various fields such as sports, music, and entrepreneurship. Their achievements bring joy, recognition, and a sense of fulfillment. For example, swimming champions in the Special Olympics, professional musicians, and actors on national TV find great satisfaction in their roles. They inspire others through their dedication, hard work, and success. Their job satisfaction is also evident in their entrepreneurial ventures, such as running their businesses and creating fashion lines tailored for individuals with Down syndrome. They take pride in their work, enjoy the social interactions it brings, and value the recognition they receive from their communities.
# Memory Skills
# Individuals with Down syndrome exhibit impressive memory skills, which play a crucial role in their professional and personal lives. They remember detailed routines, manage business tasks efficiently, and perform job roles with high accuracy. Their ability to recall information and follow established procedures contributes to their success in various job roles.
# Willingness to Learn
# A strong willingness to learn is a common trait among individuals with Down syndrome. They embrace new challenges, seek out learning opportunities, and continuously strive to improve their skills. Whether it's through internships, volunteer work, or pursuing new hobbies, they demonstrate a proactive approach to personal and professional growth. Their enthusiasm for learning and adapting to new environments highlights their determination to succeed.
# Teamwork
# Teamwork is a cornerstone of success for individuals with Down syndrome. They excel in collaborative environments, contributing positively to their teams and building strong relationships with coworkers. Their supportive nature, combined with a commitment to achieving common goals, makes them valuable team members. They take on leadership roles in community organizations, participate actively in group activities, and inspire others with their teamwork and dedication.
# """
