
from pymongo import MongoClient, DESCENDING
from bson import ObjectId
import re
from datetime import datetime


client = MongoClient('mongodb://localhost:27017')
db = client['ipb_db']
user_collection = db['user']
DESCENDING = DESCENDING
book_collection = db['book']
category_collection = db['category']
bookshelf_collection = db['bookshelf']
book_in_bookshelf_collection = db['book_in_bookshelf']
borrowed_collection = db['borrowed']
comment_collection = db['comment']


def valid_id(id):
    if ObjectId.is_valid(id):
        return True
    else:
        return False

