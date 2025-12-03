from pydantic import BaseModel

class chatInput(BaseModel):
    query: str