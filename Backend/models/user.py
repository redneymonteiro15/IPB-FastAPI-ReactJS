from pydantic import BaseModel


class User(BaseModel):
    num_student: int
    name: str
    email: str
    cell_phone: str
    password: str
