
from database.setup import category_collection
from models.category import Category


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
    categories = []
    cursor = category_collection.find({})
    c: Category
    for d in cursor:
        c = Category(
            id=str(d.get('_id')),
            name=d.get('name')
        )
        print(f'Document: {c}')
        categories.append(c)

    return categories