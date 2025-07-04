from pydantic import BaseModel
from typing import  Optional

class User(BaseModel):
    id: Optional[str]
    name: str
    email: str
    cell_phone: str
    is_admin: bool
    password: str

class UserSimple(BaseModel):
    id: str
    name: str
    email: str


def individual_user_simple(cursor):
    return UserSimple(
        id=str(cursor.get('_id')),
        name=cursor.get('name'),
        email=cursor.get('email')
    )


def individual_user(u):
    return User(
        id=str(u.get('_id')),
        name=u.get('name'),
        email=u.get('email'),
        cell_phone=u.get('cell_phone'),
        is_admin=u.get('is_admin'),
        password=''
    )