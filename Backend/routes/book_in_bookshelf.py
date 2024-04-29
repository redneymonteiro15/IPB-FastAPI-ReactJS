from fastapi import APIRouter
from database.crud_book_in_bookshelf import insert_book_in_bookshelf_db, get_book_in_bookshelf_db, update_book_in_bookshelf_db


book_in_bookshelf = APIRouter()


@book_in_bookshelf.post('/')
def insert_book_in_bookshelf(id_book: str, id_bookshelf: str):
    return insert_book_in_bookshelf_db(id_book, id_bookshelf)

@book_in_bookshelf.get('/')
def get_book_in_bookshelf(id_bookshelf: str = None, id_book: str = None, id_user: str = None):
    return get_book_in_bookshelf_db(id_bookshelf, id_book,  id_user)

@book_in_bookshelf.put('/')
def update_book_in_bookshelf(last_id_bookshelf: str, new_id_bookshelf: str, id_book: str):
    return update_book_in_bookshelf_db(last_id_bookshelf, new_id_bookshelf, id_book)


