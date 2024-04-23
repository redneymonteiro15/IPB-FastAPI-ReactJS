from pydantic import BaseModel
from typing import Optional

class Bookshelf(BaseModel):
    id: Optional[str]
    name: Optional[str]
    date_create: str

class BookInBookshelf(BaseModel):
    id: Optional[str]
    id_bookshelf: str
    id_book: str
    data: str