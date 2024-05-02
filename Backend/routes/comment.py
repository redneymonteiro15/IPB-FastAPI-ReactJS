from fastapi import APIRouter
from database.crud_comment import insert_comment_db


comment = APIRouter()

@comment.post('/')
def insert_comment(email: str, message: str, date: str):
    return insert_comment_db(email, message, date)