from fastapi import APIRouter
from server.models.book import Book
from server.database.crud_book import insert_book_db, find_book_db


book = APIRouter()

@book.post('/')
def insert_book(book: Book):
    return insert_book_db(book)

@book.get('/')
def get_book(id: str = None, category: str = None, name: str = None):
    return find_book_db(id, category, name)
