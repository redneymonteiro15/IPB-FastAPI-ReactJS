from pydantic import BaseModel
from typing import Optional
class Category(BaseModel):
    id: Optional[str]
    name: str


def individual_category(c):
    return Category(
        id=str(c.get('_id')),
        name=c.get('name')
    )

def list_categories(cursor):
    categories = []

    for c in cursor:
        categories.append(individual_category(c))

    return categories