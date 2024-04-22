import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom';
import './styles.css'


function Book() {

  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])

  const [bookName, setBookName] = useState('')
  const [category, setCategory] = useState('All')

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleCategoryChange = (event) => {
      setCategory(event.target.value);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/getAllBooks')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));

    fetch('http://127.0.0.1:8000/getAllCcategories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, [])

  const searchBook = () => {
     if (bookName.trim()) {
      fetch('http://127.0.0.1:8000/getBookByCategoryAndName?category='+category+'&name='+bookName)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    } else {
      fetch('http://127.0.0.1:8000/getBookByCategory?category='+category)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }    
  };

  
  const navigate = useNavigate();
  const goBookDetails = (id) => {
    navigate(`/book-details?id=${encodeURIComponent(id)}`);
  }

  
    
  return(
      <div>
          <Header pageName={'Books'} />
          
          <section className="section">
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
                  {books.map(book => (    
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
