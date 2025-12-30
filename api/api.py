from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import chatInput
import os, json, PyPDF2
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer, util
from google import genai

load_dotenv()
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM client
client = genai.Client(api_key=os.getenv('API_KEY'))
chat_instance = client.chats.create(model="gemini-2.5-flash")  

# Load Sentence Transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAQ and create embeddings
with open("../FAQ.json", "r") as f:
    data = json.load(f)
faq_questions = data["questions"]
faq_answers = data["answers"]
faq_emb = model.encode(faq_questions, convert_to_tensor=True)

# Load PDF knowledge base and create embeddings
doc_text = ""
with open("test.pdf", "rb") as file:
    reader = PyPDF2.PdfReader(file)
    for page in reader.pages:
        doc_text += page.extract_text() + "\n"

# Split PDF into chunks
def split_text(text, chunk_size=500):
    sentences = text.split("\n")
    chunks = []
    chunk = ""
    for sentence in sentences:
        if len(chunk) + len(sentence) <= chunk_size:
            chunk += " " + sentence
        else:
            chunks.append(chunk.strip())
            chunk = sentence
    if chunk:
        chunks.append(chunk.strip())
    return chunks

doc_chunks = split_text(doc_text)
doc_emb = model.encode(doc_chunks, convert_to_tensor=True)

# Chat history (in-memory, can be per-user in production)
chat_history = []

@app.post("/chat")
def chat(input: chatInput):
    global chat_history

    # Encode user query
    user_emb = model.encode(input.query, convert_to_tensor=True)

    # Check FAQ first
    faq_cos_sim = util.cos_sim(faq_emb, user_emb)
    max_faq_sim, faq_idx = faq_cos_sim.max(0)

    if max_faq_sim >= 0.7:
        context = faq_answers[faq_idx.item()]
    else:
        # Otherwise use PDF chunk
        doc_cos_sim = util.cos_sim(doc_emb, user_emb)
        doc_idx = doc_cos_sim.argmax()
        context = doc_chunks[doc_idx.item()]

    # Prepare messages with chat history for LLM
    messages = []
    for h in chat_history:
        messages.append({"role": "user", "content": h["user"]})
        messages.append({"role": "assistant", "content": h["bot"]})

    # Add current query and context
    messages.append({"role": "user", "content": input.query})
    messages.append({"role": "assistant", "content": f"Context: {context}"})

    # Send to LLM using chat_instance
    response = chat_instance.send_message(input.query + f"\nContext: {context}")

    # Save to chat history
    chat_history.append({
        "user": input.query,
        "bot": response.text
    })

    return {
        "query": input.query,
        "response": response.text
    }
