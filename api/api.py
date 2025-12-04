from fastapi import FastAPI
from models import chatInput
from google import genai
import os,json
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer,util

load_dotenv()
app=FastAPI()
client = genai.Client(api_key=os.getenv('API_KEY'))
model = SentenceTransformer("all-MiniLM-L6-v2")

#creating FAQ embeddings
with open("../FAQ.json","r") as f:
    data = json.load(f)

emb=model.encode(data["questions"])

@app.post("/chat")
def chat(input:chatInput):
    user_question_embedding=model.encode(input.query)
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
        contents=input.query
        )
        return {
            "query": input.query,
            "response":response.text
            }
    else:
        return {
            "query": input.query,
            "response":data["answers"][q_id]
            }