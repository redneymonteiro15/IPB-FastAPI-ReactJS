
from pydantic import BaseModel
from typing import Optional

class Borrowed(BaseModel):
    id: Optional[str]
    id_book: str
    id_user: str
    borrowed_date: str
    returned_date: str
    status: str