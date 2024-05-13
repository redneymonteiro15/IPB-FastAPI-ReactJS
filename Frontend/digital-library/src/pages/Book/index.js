import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import { getAllBooks, getAllCategories, getBookByCategory, getBookByCategoryAndName, getBookByName } from "../../action/API/book";
import './styles.css'


function Book() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])

  const [bookName, setBookName] = useState('')
  const [category, setCategory] = useState('All')

  const { search } = useLocation();


  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleCategoryChange = (event) => {
      setCategory(event.target.value);
  };

  useEffect(() => {
    const b = [
      {
        "_id": "66262d1e8606915195d6bdb9",
        "name": "Programmer",
        "description": "The definitive reference to C++ by the creator of C++, The C++ Programming Language teaches one of the most widely-used, general-purpose programming languages. At an advanced pace this book teaches how to work with compilers updated for the new standard. Students with experience with C++ heading toward domains where mid-size to large applications are being developed - networking, finance, graphics, and games - will find this book an excellent learning tool.",
        "isbn": "4325513251",
        "pages": 416,
        "category": "Programmer",
        "author": "Bjarne Stoustrup",
        "published": "TAG Livros - Paralela",
        "publication_date": "2019",
        "image": ""
      },
      {
        "_id": "66262d318606915195d6bdba",
        "name": "C++ Programming Language",
        "description": "The definitive reference to C++ by the creator of C++, The C++ Programming Language teaches one of the most widely-used, general-purpose programming languages. At an advanced pace this book teaches how to work with compilers updated for the new standard. Students with experience with C++ heading toward domains where mid-size to large applications are being developed - networking, finance, graphics, and games - will find this book an excellent learning tool.",
        "isbn": "4325513251",
        "pages": 416,
        "category": "Database",
        "author": "Bjarne Stoustrup",
        "published": "TAG Livros - Paralela",
        "publication_date": "2019",
        "image": ""
      }
    ]
    const c = [
      {
        "_id": "66266535876d0fec6d732dff",
        "name": "Programmer"
      },
      {
        "_id": "66266562876d0fec6d732e00",
        "name": "Database"
      }
    ]

    setBooks(b)
    setCategories(c)
    /* const searchParams = new URLSearchParams(search);
    const data = searchParams.get('search');
    setBookName(data)
    
    if(data !== null){
      getBookByName(data)
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    } else {
      setBookName('')
      getAllBooks()
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }
    
    getAllCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error)); */
  }, [])

  const searchBook = () => {
    if (bookName.trim()) {
      getBookByCategoryAndName(category, bookName)
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    } else {
      getBookByCategory(category)
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }    
  };


  const goBookDetails = (id) => {
    navigate(`/book-details?id=${encodeURIComponent(id)}`);
  }

  
    
  return(
      <div>
          <Header pageName={'Books'} />
          
          <section className="book">
              <aside className="aside-search">
                <input type="search" placeholder="Book name" value={bookName} onChange={handleBookNameChange} />
                <select value={category} onChange={handleCategoryChange}>
                  <option value="All">All</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
                <button onClick={searchBook}>
                    Search
                </button>
              </aside>
              <aside className="list-books">
                <div class="mb-3">
                  {books.length == 0 
                  ? <div className="cardNoFound">
                      <Icon.InfoCircle className="infoIcon" />	
                      <p>No book found!</p>
                    </div>
                  : books.map(book => (    
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img src={book.image} class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <p className="card-category">{book.category}</p>
                            <h5 class="card-title">{book.name}</h5>
                            <p class="card-author">{book.author}</p>
                            <button class="card-button" onClick={() => goBookDetails(book.id)}>
                                See details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </aside>
          </section>

          <Footer />
      </div>
  )
}

export default Book;
