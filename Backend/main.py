

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.user import User
from models.book import Book
from models.category import Category
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
def get_book_by_category_name(category: str, name: str):
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