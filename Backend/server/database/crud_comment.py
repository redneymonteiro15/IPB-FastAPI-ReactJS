from server.database.setup import comment_collection, valid_id




def insert_comment_db(email, message, date):

    inserted_comment = comment_collection.insert_one({'email': email, 'messsage': message, 'date': date}).inserted_id

    return valid_id(inserted_comment)
