from pydantic import BaseModel
from typing import Optional

class Comment(BaseModel):
    id: Optional[str]
    email: str
    message: str
    date: str