
from fastapi import APIRouter
from models.user import User
from database.crud_user import insert_user_db, get_user_db

user = APIRouter()

@user.post('/')
def insert_user(u: User):
    return insert_user_db(u)

@user.get('/')
def get_user(email: str, password: str):
    return get_user_db(email, password)

