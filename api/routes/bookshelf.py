from fastapi import APIRouter
from server.database.crud_bookshelf import insert_bookshelf_db, get_bookshelf_db, update_Bookshelf_name_db, delete_bookshelf_db

bookshelf = APIRouter()
book_in_bookshelf = APIRouter()

@bookshelf.post('/')
def insert_bookshelf(name: str, id_user: str):
    return insert_bookshelf_db(name, id_user)

@bookshelf.get('/')
def get_bookshelf(id: str = None, name: str = None, id_user: str = None):
    return get_bookshelf_db(id, name, id_user)

@bookshelf.put('/')
def update_bookshelf_name(id_bookshelf: str, name: str):
    return update_Bookshelf_name_db(id_bookshelf, name)

@bookshelf.delete('/')
def delete_bookshelf(id_bookshelf: str):
    return delete_bookshelf_db(id_bookshelf)