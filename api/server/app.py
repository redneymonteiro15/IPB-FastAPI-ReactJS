from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routes.user import user
from server.routes.book import book
from server.routes.category import category
from server.routes.bookshelf import bookshelf
from server.routes.borrowed import borrowed
from server.routes.book_in_bookshelf import book_in_bookshelf
from server.routes.comment import comment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#include router
app.include_router(user, prefix="/user")
app.include_router(book, prefix='/book')
app.include_router(category, prefix='/category')
app.include_router(bookshelf, prefix='/bookshelf')
app.include_router(borrowed, prefix='/borrowed')
app.include_router(book_in_bookshelf, prefix='/book-in-bookshelf')
app.include_router(comment, prefix='/comment')