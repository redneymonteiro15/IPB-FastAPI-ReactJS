from fastapi import APIRouter

comment = APIRouter()

@comment.post('/')
def insert_post():
    return True