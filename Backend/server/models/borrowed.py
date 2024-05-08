
from pydantic import BaseModel
from typing import Optional
from server.models.book import Book
from server.database.crud_book import exist_book
from server.models.book import individual_book

class Borrowed(BaseModel):
    id: Optional[str]
    id_book: str
    book: Book
    id_user: str
    borrowed_date: str
    returned_date: str
    status: str

def individual_borrowed(b, book):
    return Borrowed(
        id=str(b.get('_id')),
        id_user=b.get('id_user'),
        id_book=b.get('id_book'),
        book=book,
        borrowed_date=b.get('borrowed_date'),
        returned_date=b.get('returned_date'),
        status=b.get('status')
    )

def list_borrowed(cursor):
    borrow = []

    for b in cursor:
        book = exist_book(b.get('id_book'))
        print(book.get('_id'))
        borrow.append(individual_borrowed(b, individual_book(book)))


    return borrow