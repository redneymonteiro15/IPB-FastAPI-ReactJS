
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user
from routes.book import book
from routes.category import category
from routes.bookshelf import bookshelf
from routes.borrowed import borrowed
from routes.book_in_bookshelf import book_in_bookshelf
from routes.comment import comment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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