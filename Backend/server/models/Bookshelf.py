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


def individual_bookshelf(b):
    return Bookshelf(
        id=str(b.get('_id')),
        name=str(b.get('name')),
        date_create=str(b.get('date_create'))
    )

def list_bookshelf(cursor):
    bookshelf = []

    for b in cursor:
        bookshelf.append(individual_bookshelf(b))

    return bookshelf