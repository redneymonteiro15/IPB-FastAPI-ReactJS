
from database.setup import user_collection, DESCENDING
from models.user import User



def exist_user(email: str):
    existing_user = user_collection.find_one({'email': email})
    return existing_user

def insert_user_db(user: User):
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

def get_user_db(email, password):

    existing_user = exist_user(email)
    if existing_user is None:
        print('user not exist')
        return False

    print(existing_user)
    if str(existing_user['password']) == password:
        print('True')
        return True

    print('False')
    return False
