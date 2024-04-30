
from database.setup import bookshelf_collection, valid_id
from bson import ObjectId
from datetime import datetime
from models.Bookshelf import Bookshelf

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


def get_bookshelf_db(id: str = None, name: str = None, id_user: str = None):
    if id is not None:
        return get_bookshelf_by_id_db(id)
    elif name is not None:
        return None
    elif id_user is not None:
        return get_all_bookshelf_db(id_user)
    else:
        return None


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

def delete_bookshelf_db(id_bookshelf):

    if valid_id(id_bookshelf) is False:
        return False

    existing_bookshelf = exist_bookshelf_by_id(id_bookshelf)
    if existing_bookshelf is None:
        return False

    delete_count = bookshelf_collection.delete_one({'_id': ObjectId(id_bookshelf)}).deleted_count
    print(delete_count)

    if delete_count == 0:
        return False

    return True