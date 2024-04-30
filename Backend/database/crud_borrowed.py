
from database.setup import borrowed_collection, valid_id
from database.crud_book import exist_book
from database.crud_book import get_book_by_id_db
from models.borrowed import Borrowed

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

    # Converte o cursor em uma lista e verifica o comprimento
    last_borrowed_list = list(last_borrowed)
    if len(last_borrowed_list) > 0:
        #print(last_borrowed_list[0])
        book = get_book_by_id_db(last_borrowed_list[0].get('id_book'))
        b = Borrowed(
            id=str(last_borrowed_list[0].get('_id')),
            id_book=last_borrowed_list[0].get('id_book'),
            book=book,
            id_user=last_borrowed_list[0].get('id_user'),
            borrowed_date=last_borrowed_list[0].get('borrowed_date'),
            returned_date=last_borrowed_list[0].get('returned_date'),
            status=last_borrowed_list[0].get('status')
        )
        return b
    else:
        return None

def get_borrowed_by_status(status, id_user):

    if valid_id(id_user) is False:
        return None


    borrow = []
    cursor = borrowed_collection.find({
        'id_user': id_user,
        'status': status
    })
    for d in cursor:
        #print(d)
        book = get_book_by_id_db(d.get('id_book'))

        b = Borrowed(
            id=str(d.get('_id')),
            id_user=d.get('id_user'),
            id_book=d.get('id_book'),
            book=book,
            borrowed_date=d.get('borrowed_date'),
            returned_date=d.get('returned_date'),
            status=d.get('status')
        )
        borrow.append(b)


    return borrow


