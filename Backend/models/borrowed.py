
from pydantic import BaseModel
from typing import Optional
from models.book import Book

class Borrowed(BaseModel):
    id: Optional[str]
    id_book: str
    book: Book
    id_user: str
    borrowed_date: str
    returned_date: str
    status: str