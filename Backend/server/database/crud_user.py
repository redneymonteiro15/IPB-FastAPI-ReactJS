
from server.database.setup import user_collection, DESCENDING, valid_id
from server.database.security import hash_password, verify_password
from server.models.user import User, individual_user_simple
from bson import ObjectId



def exist_user(email: str):
    existing_user = user_collection.find_one({'email': email})
    return existing_user

def exist_user_by_id(id: str):
    existing_user = user_collection.find_one({'_id': ObjectId(id)})
    return existing_user

def insert_user_db(user: User):
    existing_user = exist_user(user.email)
    if existing_user is not None:
        print('Exist user')
        return None

    print('No exist user')

    user_collection.insert_one({
        'name': user.name,
        'email': user.email,
        'cell_phone': user.cell_phone,
        'password': hash_password(user.password)
    })

    return True


def get_user_db(id, email, password):
    if id is not None:
        return get_user_by_id(id)
    elif email is not None and password is not None:
        return get_user_by_email_and_password(email, password)
    elif email is not None:
        return get_id_user_by_email(email)
    else:
        return None

def get_user_by_email_and_password(email, password):

    existing_user = exist_user(email)
    if existing_user is None:
        print('user not exist')
        return False

    print(existing_user)
    if verify_password(password, str(existing_user['password'])):
        print('True')
        return True

    print('False')
    return False

def get_id_user_by_email(email):
    existing_user = exist_user(email)
    if existing_user is None:
        print('user not exist')
        return None

    return individual_user_simple(existing_user)

def get_user_by_id(id):
    if valid_id(id) is False:
        return None

    user = user_collection.find_one({'_id': ObjectId(id)})

    if user is not None:
        u = User(
            id=str(user.get('_id')),
            num_student=str(user.get('num_student')),
            name=user.get('name'),
            email=user.get('email'),
            cell_phone=user.get('cell_phone'),
            password=''
        )
        return u

    return None



def update_user_db(id, cell_phone, password, new_password):
    if cell_phone is not None:
        return update_user(id, cell_phone)
    elif password is not None and new_password is not None:
        return change_password(id, password, new_password)
    else:
        return False


def update_user(id, cell_phone):
    if valid_id(id) is False:
        return False

    updating_user = user_collection.update_one({'_id': ObjectId(id)}, {
        '$set': {'cell_phone': cell_phone}
    }).modified_count

    print(updating_user)
    if updating_user == 0:
        return False

    return True

def change_password(id, password, new_password):
    if valid_id(id) is False:
        return False

    existing_user = exist_user_by_id(id)

    if existing_user is None:
        return False

    print(existing_user.get('password'))
    if not verify_password(password, existing_user.get('password')):
        return False

    updating_user = user_collection.update_one({'_id': ObjectId(id)}, {
        '$set': {'password': hash_password(new_password)}
    }).modified_count

    print(updating_user)
    if updating_user == 0:
        return False

    return True