from server.database.setup import book_in_bookshelf_collection, valid_id, bookshelf_collection
from datetime import datetime
from server.models.book import individual_book
from server.models.Bookshelf import individual_bookshelf
from server.database.crud_bookshelf import exist_bookshelf_by_id
from server.database.crud_book import exist_book
import re


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

def get_book_in_bookshelf_db(id_bookshlef, name_book, id_book,  id_user):
    if name_book is not None and id_bookshlef is not None:
        return get_book_in_bookshelf_db_by_bookshelf(id_bookshlef, name_book)
    elif id_book is not None and id_user is not None:
        return get_book_in_bookshelf_by_id_book_db(id_book, id_user)
    else:
        return None


def get_book_in_bookshelf_db_by_bookshelf(id_bookshelf, name_book):
    if valid_id(id_bookshelf) is False:
        return []

    if exist_bookshelf_by_id(id_bookshelf) is False:
        return []

    books = []
    name_regex = re.compile(f'.*{re.escape(name_book)}.*', re.IGNORECASE)
    cursor = book_in_bookshelf_collection.find({'id_bookshelf': id_bookshelf})
    #cursor = book_in_bookshelf_collection.find({'id_bookshelf': ObjectId(id_bookshelf)})

    for d in cursor:
        b = individual_book(exist_book(d.get('id_book')))
        if name_book is 'All':
            books.append(b)
        elif b.name.find(name_book):
            #print(b)
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
            return individual_bookshelf(d)

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

def delete_book_in_bookshelf_db(id_book, id_bookshelf):
    if valid_id(id_book) is False or valid_id(id_bookshelf) is False:
        print('exist')
        return False

    if exist_bookshelf_by_id(id_bookshelf) is False:
        print('no exist bookshelf')
        return False

    if exist_book(id_book) is None:
        print('no exist book')
        return False

    delete_count = book_in_bookshelf_collection.delete_one({'id_book': id_book, 'id_bookshelf': id_bookshelf}).deleted_count

    print(delete_count)
    if delete_count == 0:
        return False

    return True