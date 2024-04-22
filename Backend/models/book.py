from pydantic import BaseModel
from typing import Optional

class Book(BaseModel):
    id: Optional[str]
    name: str
    description: str
    pages: int
    published: str
    publisher: str
    isbn: str
    author: str
    category: str
