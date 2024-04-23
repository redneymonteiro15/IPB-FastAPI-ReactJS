import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useLocation } from 'react-router-dom';
import imgbook from '../../assets/book.jpg'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'


function BookDetails() {
    
    const { search } = useLocation();
    const [id, setId] = useState()
    const [book, setBook] = useState(null)

    const[showModal, setShowModal] = useState(false)
    const [bookshelf_name, setBookshelfName] = useState('')
    const [bookshelfs, setBookshelf] =useState([])

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data)

        if(data == null){
            window.location.href='/book'
        }

        fetch('http://127.0.0.1:8000/getBookById?id='+data)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching books:', error));
        
        fetch('http://127.0.0.1:8000/getAllBookshelf?id_user=66251e4eede07cfa79f98bf9')
            .then(response => response.json())
            .then(data => setBookshelf(data))
            .catch(error => console.error('Error fetching books:', error));
        

    }, [search]) 


    const addBookToBookshelf = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleBookshelfChange = (event) => {
        setBookshelfName(event.target.value)
    }
    const handleAddModal = () => {
        

        setShowModal(true)
    }

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
                                            <button onClick={() => addBookToBookshelf()}>
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
            <Modal className="modal" show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modalTitle">Add {book?.name} in bookshelft</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modalBody">
                            <label>Bookshelf</label>
                            <select  onChange={handleBookshelfChange}>
                                {bookshelfs.map(b => (
                                    <option key={b.id} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="modalFooter">
                            <Button className="buttonCancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button className="buttonAdd" onClick={handleAddModal}>
                                Add
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>

            <Footer />
        </div>
    )
}

export default BookDetails;  
