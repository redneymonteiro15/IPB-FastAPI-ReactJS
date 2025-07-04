from fastapi import APIRouter
from server.models.book import Book
from server.database.crud_book import insert_book_db, find_book_db, update_book_db, delete_book_db


book = APIRouter()

@book.post('/')
def insert_book(book: Book):
    return insert_book_db(book)

@book.get('/')
def get_book(id: str = None, category: str = None, name: str = None):
    return find_book_db(id, category, name)

@book.put('/')
def update_book(book: Book):
    return update_book_db(book)

@book.delete('/')
def delete_book(id_book: str):
    return delete_book_db(id_book)
