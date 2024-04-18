

from fastapi import FastAPI

from models.user import User
from database.setup import *

app = FastAPI()


@app.get('/')
def index():
    return {'Hello': 'World'}

@app.post('/register')
def insert_user(user: User):
    return insert_user_db(user)


@app.get('/signin')
def find_user_by_email_password(email: str, password: str):
    return  find_user_by_email_password_db(email, password)