
from server.database.setup import category_collection
from server.models.category import Category, list_categories


def existCategory(name: str):
    existingCategory = category_collection.find_one({'name': name})
    return existingCategory

def insert_category_db(category: Category):

    existingCategory = existCategory(category.name)

    if existingCategory is not None:
        return None

    category_collection.insert_one({
        'name': category.name
    })

    return True

def get_all_categories_db():
    cursor = category_collection.find({})

    return list_categories(cursor)