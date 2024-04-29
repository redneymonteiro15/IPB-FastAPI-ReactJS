from database.setup import book_in_bookshelf_collection, valid_id, book_collection, bookshelf_collection
from datetime import datetime
from models.book import Book
from models.Bookshelf import Bookshelf
from database.crud_bookshelf import exist_bookshelf_by_id
from database.crud_book import exist_book
from bson import ObjectId


def insert_book_in_bookshelf_db(id_book: str, id_bookshelf: str):

   if exist_bookshelf_by_id(id_bookshelf) is False or exist_book(id_book) is None:
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

def get_book_in_bookshelf_db(id_bookshlef, id_book,  id_user):
    if id_bookshlef is not None:
        return get_book_in_bookshelf_db_by_bookshelf(id_bookshlef)
    elif id_book is not None and id_user is not None:
        return get_book_in_bookshelf_by_id_book_db(id_book, id_user)
    else:
        return None


def get_book_in_bookshelf_db_by_bookshelf(id_bookshelf):
    if valid_id(id_bookshelf) is False:
        return []

    if exist_bookshelf_by_id(id_bookshelf) is False:
        return []

    books = []
    cursor = book_in_bookshelf_collection.find({'id_bookshelf': id_bookshelf})
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

def get_book_in_bookshelf_by_id_book_db(id_book, id_user):

    if valid_id(id_book) is False or valid_id(id_user) is False:
        return None

    if exist_book(id_book) is None:
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

def update_book_in_bookshelf_db(last_id_bookshelf, new_id_bookshelf, id_book):

    if valid_id(last_id_bookshelf) is False or valid_id(new_id_bookshelf) is False or valid_id(id_book) is False:
        print('exist')
        return False

    if exist_bookshelf_by_id(last_id_bookshelf) is False or exist_bookshelf_by_id(new_id_bookshelf) is False:
        print('no exist bookshelf')
        return False

    if exist_book(id_book) is None:
        print('no exist book')
        return False

    book_in_bookshelf_collection.update_one({'id_book': id_book, 'id_bookshelf': last_id_bookshelf}, {
        '$set': {'id_bookshelf': new_id_bookshelf}
    })


    return True
