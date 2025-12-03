from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv('API_KEY'))

from sentence_transformers import SentenceTransformer,util
import json

model = SentenceTransformer("all-MiniLM-L6-v2")

user_question="tell me your name?"
user_question_embedding=model.encode(user_question)

with open("FAQ.json","r") as f:
    data = json.load(f)



emb=model.encode(data["questions"])
cos_sim=util.cos_sim(emb,user_question_embedding)

id=0
q_id=0
for x in cos_sim:
    if x > 0.7:
        q_id=id
    id+=1

print("The most similar sentence matching the user question is:")
print(data["questions"][q_id])