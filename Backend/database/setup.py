
from models.user import User
from pymongo import MongoClient, DESCENDING



client = MongoClient('mongodb://localhost:27017')
db = client['ipb_db']
user_collection = db['user']



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
    if existing_user['password'] is password:
        return True

    return False





