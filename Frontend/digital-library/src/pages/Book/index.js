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
    const searchParams = new URLSearchParams(search);
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
      .catch(error => console.error('Error fetching categories:', error));
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
                          <img src='../../assets/favicon.png' class="img-fluid rounded-start" alt="..."/>
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
