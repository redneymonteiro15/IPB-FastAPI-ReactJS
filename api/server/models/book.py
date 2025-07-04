from pydantic import BaseModel
from typing import Optional

class Book(BaseModel):
    id: Optional[str]
    name: str
    description: str
    pages: int
    publication_date: str
    published: str
    isbn: str
    author: str
    category: str


def individual_book(b):
    return Book(
        id=str(b.get('_id')),
        name=b.get('name'),
        description=b.get('description'),
        pages=b.get('pages'),
        publication_date=b.get('publication_date'),
        published=b.get('published'),
        isbn=b.get('isbn'),
        author=b.get('author'),
        category=b.get('category')
    )


def list_book(cursor):
    books = []

    for b in cursor:
        books.append(individual_book(b))

    return books