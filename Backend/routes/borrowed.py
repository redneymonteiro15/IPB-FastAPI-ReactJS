from fastapi import APIRouter
from database.crud_borrowed import insert_borrowed_db, get_borrowed_db

borrowed = APIRouter()


@borrowed.post('/')
def insert_borrowed(id_book: str, id_user: str, borrow_date: str, returned_date: str):
    return insert_borrowed_db(id_book, id_user, borrow_date, returned_date)


@borrowed.get('/')
def get_book_is_borrowed(id_user: str, id_book: str = None, status: str = None):
    return get_borrowed_db(id_user, id_book, status)