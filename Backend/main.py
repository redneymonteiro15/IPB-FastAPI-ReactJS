

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.user import User
from models.book import Book
from models.category import Category
from models.Bookshelf import Bookshelf, BookInBookshelf
from database.setup import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    return {'Hello': 'World'}

@app.post('/register')
def insert_user(user: User):
    return insert_user_db(user)


@app.get('/signin')
def find_user_by_email_password(email: str, password: str):
    return  find_user_by_email_password_db(email, password)




@app.post('/insertBook')
def insert_book(book: Book):
    return insert_book_db(book)


@app.get('/getAllBooks')
def find_all_book():
    return find_all_book_db()


@app.get('/getBookByCategory')
def get_book_by_category(category: str):
    return get_book_by_category_db(category)

@app.get('/getBookByCategoryAndName')
def get_book_by_category_name(category: str, name: str = None):
    return get_book_by_category_name_db(category, name)


@app.post('/insertCategory')
def insert_category(category: Category):
    return insert_category_db(category)

@app.get('/getAllCcategories')
def get_all_categories():
    return get_all_categories_db()

@app.get('/getBookById')
def get_book_by_id(id: str):
    return get_book_by_id_db(id)

@app.get('/getBookByName')
def get_book_by_name(name: str):
    return get_book_by_name_db(name)

@app.post('/inserBookshelf')
def insert_bookshelf(name: str, id_user: str):
    return insert_bookshelf_db(name, id_user)

@app.get('/getAllBookshelf')
def get_all_bookshelf(id_user: str):
    return get_all_bookshelf_db(id_user)

@app.get('/getBookshelfById')
def get_bookshelf_by_id(id: str):
    return get_bookshelf_by_id_db(id)

@app.put('/updatBookshelfName')
def update_Bookshelf_name(id_bookshelf: str, name: str):
    return update_Bookshelf_name_db(id_bookshelf, name)

@app.post('/insertBookInBookshelf')
def insert_book_in_bookshelf(id_book: str, id_bookshelf: str):
    return insert_book_in_bookshelf_db(id_book, id_bookshelf)

@app.get('/getBookInBookshelf')
def get_book_in_bookshelf(id_bookshlef: str):
    return get_book_in_bookshelf_db(id_bookshlef)

@app.put('/updateBookInBookshelf')
def update_book_in_bookshelf(last_id_bookshelf: str, new_id_bookshelf: str, id_book: str):
    return update_book_in_bookshelf_db(last_id_bookshelf, new_id_bookshelf, id_book)

@app.get('/getBookInBookshelfByIdBook')
def get_book_in_bookshelf_by_id_book(id_book: str, id_user: str):
    return get_book_in_bookshelf_by_id_book_db(id_book, id_user)


@app.post('/insertBorrowed')
def insert_borrowed(id_book: str, id_user: str, borrow_date: str, returned_date: str):
    return insert_borrowed_db(id_book, id_user, borrow_date, returned_date)

@app.get('/getBookIsBorrowed')
def get_book_is_borrowed(id_book: str, id_user):
    return get_book_is_borrowed_db(id_book, id_user)

@app.get('/getBorrowedByStatus')
def get_borrowed_by_status(status: str, id_user: str):
    return get_borrowed_by_status_db(status, id_user)