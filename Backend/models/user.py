from pydantic import BaseModel
from typing import  Optional

class User(BaseModel):
    id: Optional[str]
    num_student: str
    name: str
    email: str
    cell_phone: str
    password: str
