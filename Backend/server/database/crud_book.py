
from server.database.setup import book_collection, valid_id
from server.models.book import Book, list_book, individual_book
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
    cursor = book_collection.find({})
    return list_book(cursor)

def get_book_by_category_db(category: str):

    if category == 'All':
        cursor = book_collection.find({})
    else:
        cursor = book_collection.find({'category': category})

    return list_book(cursor)

def get_book_by_category_name_db(category: str, name: str):
    name_regex = re.compile(f'.*{re.escape(name)}.*', re.IGNORECASE)

    if category == 'All':
        cursor = book_collection.find({
            'name': {'$regex': name_regex}
        })
    else:
        cursor = book_collection.find({
            'category': category,
            'name': {'$regex': name_regex}
        })

    return list_book(cursor)


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

    return individual_book(existingBook)


def get_book_by_name_db(name):
    name_regex = re.compile(f'.*{re.escape(name)}.*', re.IGNORECASE)

    cursor = book_collection.find({
        'name': {'$regex': name_regex}
    })

    return list_book(cursor)