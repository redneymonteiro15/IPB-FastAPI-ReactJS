
from database.setup import book_collection, valid_id
from models.book import Book
import re
from bson import ObjectId


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


def find_book_db(id: str = None, category: str = None, name: str = None):
    if id is not None:
        return get_book_by_id_db(id)
    elif category is not None and name is not None:
        return get_book_by_category_name_db(category, name)
    elif category is not None:
        return get_book_by_category_db(category)
    elif name is not None:
        return get_book_by_name_db(name)
    else:
        return find_all_book_db()

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



def exist_book(id):
    if valid_id(id):
        print('valid object')
        existingBook = book_collection.find_one({'_id': ObjectId(id)})
        return existingBook
    else:
        print('Invalid id')
        return None

def get_book_by_id_db(id: str):
    existingBook = exist_book(id)

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