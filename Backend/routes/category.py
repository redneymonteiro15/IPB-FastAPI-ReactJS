from fastapi import APIRouter
from models.category import Category
from database.crud_category import insert_category_db, get_all_categories_db


category = APIRouter()

@category.post('/')
def insert_category(category: Category):
    return insert_category_db(category)

@category.get('/')
def get_all_categories():
    return get_all_categories_db()