from pydantic import BaseModel
from typing import  Optional

class User(BaseModel):
    num_student: Optional[str]
    name: str
    email: str
    cell_phone: str
    password: str
