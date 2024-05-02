
from fastapi import APIRouter
from models.user import User
from database.crud_user import insert_user_db, get_user_db, update_user_db

user = APIRouter()

@user.post('/')
def insert_user(u: User):
    return insert_user_db(u)

@user.get('/')
def get_user(id: str = None, email: str = None, password: str = None):
    return get_user_db(id, email, password)

@user.put('/')
def update_user(id: str, cell_phone: str = None, password: str = None, new_password: str = None):
    return update_user_db(id, cell_phone, password, new_password)

