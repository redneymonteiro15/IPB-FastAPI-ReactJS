from pydantic import BaseModel
from typing import  Optional

class User(BaseModel):
    id: Optional[str]
    num_student: str
    name: str
    email: str
    cell_phone: str
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