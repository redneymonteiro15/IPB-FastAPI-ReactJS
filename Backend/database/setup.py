from models.user import User
from models.book import Book
from models.category import Category
from pymongo import MongoClient, DESCENDING
from bson import ObjectId
import re


client = MongoClient('mongodb://localhost:27017')
db = client['ipb_db']
user_collection = db['user']
book_collection = db['book']
category_collection = db['category']


def exist_user(email: str):
    existing_user = user_collection.find_one({'email': email})
    return existing_user

def insert_user_db(user: User):
    #existe o user
    existing_user = exist_user(user.email)
    if existing_user is not None:
        print('Exist user')
        return False

    print('No exist user')

    last_user = user_collection.find_one(sort=[('num_student', DESCENDING)])
    last_num_user = last_user['num_student'] if last_user else 1

    user_collection.insert_one({
        'num_student': last_num_user+1,
        'name': user.name,
        'email': user.email,
        'cell_phone': user.cell_phone,
        'password': user.password
    })

    return True

def find_user_by_email_password_db(email, password):

    existing_user = exist_user(email)
    if existing_user is None:
        print('user not exist')
        return False

    print(existing_user)
    if str(existing_user['password']) == password:
        return True

    return False

def existCategory(name: str):
    existingCategory = category_collection.find_one({'name': name})
    return existingCategory

def insert_category_db(category: Category):

    existingCategory = existCategory(category.name)

    if existingCategory is not None:
        return None

    category_collection.insert_one({
        'name': category.name
    })

    return True

def get_all_categories_db():
    categories = []
    cursor = category_collection.find({})
    c: Category
    for d in cursor:
        c = Category(
            id=str(d.get('_id')),
            name=d.get('name')
        )
        print(f'Document: {c}')
        categories.append(c)

    return categories

def insert_book_db(book: Book):

    book_insert = book_collection.insert_one({
        'name': book.name,
        'description': book.description,
        'isbn': book.isbn,
        'pages': book.pages,
        'category': book.category,
        'author': book.author,
        'publisher': book.publisher,
        'published': book.published
    })


    return True

def find_all_book_db():

    books = []
    cursor = book_collection.find({})
    b: Book
    for d in cursor:
        b = Book(
            id=str(d.get('_id')),
            name=d.get('name'),
            description=d.get('description'),
            pages=d.get('pages'),
            published=d.get('published'),
            publisher=d.get('publisher'),
            isbn=d.get('isbn'),
            author=d.get('author'),
            category=d.get('category')
        )
        books.append(b)

    return books

def get_book_by_category_db(category: str):
    books = []
    if category == 'All':
        cursor = book_collection.find({})
    else:
        cursor = book_collection.find({'category': category})
    b: Book
    for d in cursor:
        b = Book(
            id=str(d.get('_id')),
            name=d.get('name'),
            description=d.get('description'),
            pages=d.get('pages'),
            published=d.get('published'),
            publisher=d.get('publisher'),
            isbn=d.get('isbn'),
            author=d.get('author'),
            category=d.get('category')
        )
        books.append(b)

    return books

def get_book_by_category_name_db(category: str, name: str):
    name_regex = re.compile(f'.*{re.escape(name)}.*', re.IGNORECASE)

    books = []
    if category == 'All':
        cursor = book_collection.find({
            'name': {'$regex': name_regex}
        })
    else:
        cursor = book_collection.find({
            'category': category,
            'name': {'$regex': name_regex}
        })

    for d in cursor:
        b = Book(
            id=str(d.get('_id')),
            name=d.get('name'),
            description=d.get('description'),
            pages=d.get('pages'),
            published=d.get('published'),
            publisher=d.get('publisher'),
            isbn=d.get('isbn'),
            author=d.get('author'),
            category=d.get('category')
        )
        books.append(b)

    return books


def existBook(id):
    existingBook = book_collection.find_one({'_id': ObjectId(id)})
    return existingBook

def get_book_by_id_db(id: int):
    existingBook = existBook(id)

    if existingBook is None:
        print(existingBook)
        return None

    b = Book(
        id=str(existingBook.get('_id')),
        name=existingBook.get('name'),
        description=existingBook.get('description'),
        pages=existingBook.get('pages'),
        published=existingBook.get('published'),
        publisher=existingBook.get('publisher'),
        isbn=existingBook.get('isbn'),
        author=existingBook.get('author'),
        category=existingBook.get('category')
    )

    return b
