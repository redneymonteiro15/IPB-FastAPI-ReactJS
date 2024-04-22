

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.user import User
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