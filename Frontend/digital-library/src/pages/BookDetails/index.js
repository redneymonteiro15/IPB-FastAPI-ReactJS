import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useLocation } from 'react-router-dom';
import imgbook from '../../assets/book.jpg'
import './styles.css'
import * as Icon from 'react-bootstrap-icons'


function BookDetails() {
    
    const { search } = useLocation();
    const [id, setId] = useState()
    const [book, setBook] = useState(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data)

        fetch('http://127.0.0.1:8000/getBookById?id=66262d318606915195d6bdba')
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching books:', error));

    }, [search]) 

    return(
        <div>
            <Header pageName={'Book Details'} />

            <section>
                {book !== null && (
                    <div class="mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={imgbook} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 className="card-name">{book.name}</h5>
                                    <p className="card-author">{book.author}</p>
                                    <p className="card-category">{book.category}</p>
                                    <hr />
                                    <div>
                                        <div className="card-borrowed">
                                            <div>
                                                <label>Borrow date</label>
                                                <input type="date" />
                                            </div>
                                            <div>
                                                <label>Returned date</label>
                                                <input type="date" />
                                            </div>
                                            <div>
                                                <button>
                                                    Borrowed
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-ToAdd">
                                            <button>
                                                To Add <Icon.CaretDown className="icon-down" />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="card-description">
                                            <h5>Description</h5>
                                            <p>{book.description}</p>
                                        </div>
                                        <div className="card-bookinformation">
                                            <h5>Book information</h5>
                                            <p><span>Pages</span> {book.pages}</p>
                                            <p><span>Published</span> {book.published}</p>
                                            <p><span>Publisher</span> {book.publisher}</p>
                                            <p><span>ISBN</span> {book.isbn}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    )
}

export default BookDetails;  
