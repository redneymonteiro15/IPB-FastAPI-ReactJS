from models.user import User
from models.book import Book
from models.category import Category
from models.Bookshelf import Bookshelf, BookInBookshelf
from models.borrowed import Borrowed
from pymongo import MongoClient, DESCENDING
from bson import ObjectId
import re
from datetime import datetime


client = MongoClient('mongodb://localhost:27017')
db = client['ipb_db']
user_collection = db['user']
book_collection = db['book']
category_collection = db['category']
bookshelf_collection = db['bookshelf']
book_in_bookshelf_collection = db['book_in_bookshelf']
borrowed_collection = db['borrowed']


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
    if ObjectId.is_valid(id):
        print('valid object')
        existingBook = book_collection.find_one({'_id': ObjectId(id)})
        return existingBook
    else:
        print('Invalid id')
        return None

def get_book_by_id_db(id: int):
    existingBook = existBook(id)

    if existingBook is None:
        print(existingBook)
        return None

    print(existingBook)
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


def get_book_by_name_db(name):
    name_regex = re.compile(f'.*{re.escape(name)}.*', re.IGNORECASE)

    books = []
    cursor = book_collection.find({
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


def exist_bookshelf(name: str):
    existing_bookshelf = bookshelf_collection.find_one({'name': name})
    return existing_bookshelf is not None

def exist_bookshelf_by_id(id: str):
    existing_bookshelf = bookshelf_collection.find_one({'_id': ObjectId(id)})
    return existing_bookshelf is not None

def insert_bookshelf_db(name: str, id_user: str):
    if exist_bookshelf(name):
        print('Exist')
        return None

    inserted_bookshelf = bookshelf_collection.insert_one({
        'name': name,
        'date_create': datetime.now(),
        'id_user': id_user
    }).inserted_id

    return valid_id(inserted_bookshelf)


def get_all_bookshelf_db(id_user: str):
    bookshelf = []
    cursor = bookshelf_collection.find({'id_user': id_user})
    #b: Bookshelf
    for d in cursor:
        b = Bookshelf(
            id=str(d.get('_id')),
            name=d.get('name'),
            date_create=str(d.get('date_create'))
        )

        bookshelf.append(b)

    print(bookshelf)
    return bookshelf

def get_bookshelf_by_id_db(id: str):

    if valid_id(id) is False:
        return None

    existing_bookshelf = bookshelf_collection.find_one({'_id': ObjectId(id)})

    if existing_bookshelf is None:
        return None

    print(f'existing: {existing_bookshelf}')


    b = Bookshelf(
        id=str(existing_bookshelf.get('_id')),
        name=existing_bookshelf.get('name'),
        date_create=str(existing_bookshelf.get('date_create')),
        list_book=None
    )

    return b




def valid_id(id):
    if ObjectId.is_valid(id):
        return True
    else:
        return False


def update_Bookshelf_name_db(id_bookshelf, name):

    if valid_id(id_bookshelf) is False:
        return False

    existing_bookshelf = exist_bookshelf_by_id(id_bookshelf)
    if existing_bookshelf is None:
        return False

    update_bookshelf = bookshelf_collection.update_one({'_id': ObjectId(id_bookshelf)}, {
        '$set': {'name': name}
    })

    return True


def insert_book_in_bookshelf_db(id_book: str, id_bookshelf: str):

   if exist_bookshelf_by_id(id_bookshelf) is False or existBook(id_book) is None:
       print('no eixst')
       return False

   inserted_book_in_bookshelf = book_in_bookshelf_collection.insert_one({
       'id_book': id_book,
       'id_bookshelf': id_bookshelf,
       'data': datetime.now()
   }).inserted_id

   if valid_id(inserted_book_in_bookshelf):
       return True

   return False


def get_book_in_bookshelf_db(id_bookshlef):
    if valid_id(id_bookshlef) is False:
        return None

    if exist_bookshelf_by_id(id_bookshlef) is False:
        return None

    books = []
    cursor = book_in_bookshelf_collection.find({'id_bookshelf': id_bookshlef})
    for d in cursor:
        book = book_collection.find_one({'_id': ObjectId(d.get('id_book'))})
        print(book)
        b = Book(
            id=str(book.get('_id')),
            name=book.get('name'),
            description=book.get('description'),
            pages=book.get('pages'),
            published=book.get('published'),
            publisher=book.get('publisher'),
            isbn=book.get('isbn'),
            author=book.get('author'),
            category=book.get('category')
        )
        print(b)
        books.append(b)

    return books


def update_book_in_bookshelf_db(last_id_bookshelf, new_id_bookshelf, id_book):

    if valid_id(last_id_bookshelf) is False or valid_id(new_id_bookshelf) is False or valid_id(id_book) is False:
        print('exist')
        return False

    if exist_bookshelf_by_id(last_id_bookshelf) is False or exist_bookshelf_by_id(new_id_bookshelf) is False:
        print('no exist bookshelf')
        return False

    if existBook(id_book) is None:
        print('no exist book')
        return False

    book_in_bookshelf_collection.update_one({'id_book': id_book, 'id_bookshelf': last_id_bookshelf}, {
        '$set': {'id_bookshelf': new_id_bookshelf}
    })


    return True

def get_book_in_bookshelf_by_id_book_db(id_book, id_user):

    if valid_id(id_book) is False or valid_id(id_user) is False:
        return None

    if existBook(id_book) is None:
        return None

    cursor_bookshelf = bookshelf_collection.find({'id_user' : id_user})
    for d in cursor_bookshelf:
        cursor_book_in_bookshelf = book_in_bookshelf_collection.find_one({'id_book': id_book, 'id_bookshelf': str(d.get('_id'))})
        if cursor_book_in_bookshelf is not None:
            return Bookshelf(
                id=str(d.get('_id')),
                name=str(d.get('name')),
                date_create=str(d.get('date_create'))
            )

    return None


def insert_borrowed_db(id_book, id_user, borrow_date, returned_date):
    if valid_id(id_book) is False or valid_id(id_user) is False:
        return False

    if existBook(id_book) is None:
        return False

    result = borrowed_collection.insert_one({
        'id_book': id_book,
        'id_user': id_user,
        'borrowed_date': borrow_date,
        'returned_date': returned_date,
        'status': 'true'
    }).inserted_id

    return valid_id(result)

def get_book_is_borrowed_db(id_book, id_user):
    if not valid_id(id_book) or not valid_id(id_user):
        return None

    if existBook(id_book) is None:
        return None

    last_borrowed = borrowed_collection.find({
        'id_book': id_book,
        'id_user': id_user,
        'status': 'true'
    }).sort([('borrowed_date', -1)]).limit(1)

    # Converte o cursor em uma lista e verifica o comprimento
    last_borrowed_list = list(last_borrowed)
    if len(last_borrowed_list) > 0:
        print(last_borrowed_list[0])
        b = Borrowed(
            id=str(last_borrowed_list[0].get('_id')),
            id_book=last_borrowed_list[0].get('id_book'),
            id_user=last_borrowed_list[0].get('id_user'),
            borrowed_date=last_borrowed_list[0].get('borrowed_date'),
            returned_date=last_borrowed_list[0].get('returned_date')
        )
        return b
    else:
        return None

def get_borrowed_by_status_db(status, id_user):

    if valid_id(id_user) is False:
        return None


    borrow = []
    cursor = borrowed_collection.find({
        'id_user': id_user,
        'status': status
    })
    for d in cursor:
        print(d)
        b = Borrowed(
            id=str(d.get('_id')),
            id_user=d.get('id_user'),
            id_book=d.get('id_book'),
            borrowed_date=d.get('borrowed_date'),
            returned_date=d.get('returned_date'),
            status=d.get('status')
        )
        borrow.append(b)


    return borrow


