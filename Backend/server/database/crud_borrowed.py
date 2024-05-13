
from server.database.setup import borrowed_collection, valid_id
from server.database.crud_book import exist_book
from server.database.crud_book import get_book_by_id_db
from server.models.borrowed import list_borrowed, individual_borrowed
from bson import ObjectId

def insert_borrowed_db(id_book, id_user, borrow_date, returned_date):
    if valid_id(id_book) is False or valid_id(id_user) is False:
        return False

    if exist_book(id_book) is None:
        return False

    result = borrowed_collection.insert_one({
        'id_book': id_book,
        'id_user': id_user,
        'borrowed_date': borrow_date,
        'returned_date': returned_date,
        'status': 'true'
    }).inserted_id

    return valid_id(result)


def get_borrowed_db(id_user, id_book, status):
    if id_user is not None and id_book is not None:
        return get_book_is_borrowed(id_book, id_user)
    elif id_user is not None and status is not None:
        return get_borrowed_by_status(status, id_user)
    else:
        return None


def get_book_is_borrowed(id_book, id_user):
    if not valid_id(id_book) or not valid_id(id_user):
        return None

    if exist_book(id_book) is None:
        return None

    last_borrowed = borrowed_collection.find({
        'id_book': id_book,
        'id_user': id_user,
        'status': 'true'
    }).sort([('borrowed_date', -1)]).limit(1)

    last_borrowed_list = list(last_borrowed)
    if len(last_borrowed_list) > 0:
        book = get_book_by_id_db(last_borrowed_list[0].get('id_book'))

        return individual_borrowed(last_borrowed_list[0], book)
    else:
        return None

def get_borrowed_by_status(status, id_user):

    if valid_id(id_user) is False:
        return None

    cursor = borrowed_collection.find({
        'id_user': id_user,
        'status': status
    })

    return list_borrowed(cursor)


def update_borrowed_db(id, status):
    if valid_id(id) is False:
        return False

    updated_borrowed = borrowed_collection.update_one({'_id': ObjectId(id)}, {
        '$set': {'status': status}
    }).modified_count

    if updated_borrowed == 0:
        return False

    return True

