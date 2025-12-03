from google import genai
import os,json
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer,util

load_dotenv()

#LOADING REQUIRED MODELS
client = genai.Client(api_key=os.getenv('API_KEY'))
model = SentenceTransformer("all-MiniLM-L6-v2")

user_question=input("Ask away: ")
user_question_embedding=model.encode(user_question)

with open("FAQ.json","r") as f:
    data = json.load(f)

emb=model.encode(data["questions"])
cos_sim=util.cos_sim(emb,user_question_embedding)

id=0
q_id=0
flag= False

for x in cos_sim:
    if x > 0.7:
        q_id=id
        flag=True
    id+=1

if not flag:
    response=client.models.generate_content(
        model="gemini-2.0-flash",
        contents=user_question
    )
    print(response.text)
else:
    print("Answer:")
    print(data["answers"][q_id])