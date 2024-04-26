import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import * as Icon from 'react-bootstrap-icons'
import { Modal, Button } from 'react-bootstrap';
import './styles.css'
import { useLocation } from 'react-router-dom'

function BookshelfDetails() {
    const { search } = useLocation();

    const [books, setBooks] = useState([])
    const [bookshelf, setBookshelf] = useState(null)
    const [searchBookName, setSearchBookName] = useState('')

    const [id, setId] = useState()
    
    const[showModal, setShowModal] = useState(false)
    const [nameBookshelf, setNameBookshelf] = useState('')

    const [res, setRes] = useState(true)

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data)

        if(data == null){
            window.location.href='/book'
        }

        fetch('http://127.0.0.1:8000/getBookshelfById?id='+data)
            .then(response => response.json())
            .then(data => setBookshelf(data))
            .catch(error => console.error('Error fetching books:', error));
        
        fetch('http://127.0.0.1:8000/getBookInBookshelf?id_bookshlef='+data)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
        
    }, [search])

    const handleSearchBook = (event) => {
        setSearchBookName(event.target.value)
    }

    const searchBook = () => {

    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleNameBookshelfModal = (event) => {
        setNameBookshelf(event.target.value)
    }
    
    const handleEditModal = () => {
        if(nameBookshelf.length !== 0){
            fetch('http://127.0.0.1:8000/updatBookshelfName?id_bookshelf=6627d83ba5c3a96dd2877024&name='+nameBookshelf,{
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to update bookshelf');
                }
                return response.json();
              })
              .then(data => {
                console.log('Bookshelf update successfully:', data);
                setRes(true)
      
                fetch('http://127.0.0.1:8000/getBookshelfById?id=6627d83ba5c3a96dd2877024')
                    .then(response => response.json())
                    .then(data => setBookshelf(data))
                    .catch(error => console.error('Error fetching books:', error));
                
              })
              .catch(error => {
                console.error('Error updating bookshelf:', error);
                setRes('Error updating bookshelf::', error)
              });
              setNameBookshelf('')
              setShowModal(false)
        }
    }

    useEffect(() => {
        let timer;
        if (res !== null) {
            timer = setTimeout(() => {
                setRes(null);
            }, 5000);  //wait 5s
        }

        return () => clearTimeout(timer);
    }, [res]);

    const editBookshelf =() => {
        setShowModal(true)
        setNameBookshelf(bookshelf?.name)
    }

    return(
        <div>
            <Header pageName={'Bookshelf details'}/>

            <section>
                <div class="row row-top">
                    {bookshelf !== null && (

                    <div><span>{bookshelf.name}</span><Icon.PencilSquare className="iconPencil" onClick={() => editBookshelf()} /></div>
                    )}
                </div>
                <div className="card-result">
                    {res !== null && (
                        res === true 
                        ?   <div className="card-successfull">
                                <p><Icon.CheckCircle /> successfully</p>
                            </div>
                        :   <div className="card-danger">
                                <p><Icon.XCircle /> Danger</p>
                            </div>
                    ) }
                </div>
                {books.length !== 0 && (
                    <div className="row-search">
                        <input type='search' placeholder='Search book' value={searchBookName} onChange={handleSearchBook} />
                        <button onClick={() => searchBook()}>
                        <Icon.Search className='icon-search' />
                        </button>
                    </div>
                )}

                <div class="row">
                    {books.length === 0 
                        ?   <div className="cardNoFound">
                                <Icon.InfoCircle className="infoIcon" />	
                                <p>No book found!</p>
                            </div>
                        :   books.map(b => {
                                return(
                                    <div class="col-sm-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">{b.name} <Icon.CaretRightFill /></h5>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })   
                    }
                </div>

                <Modal className="modal" show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title className="modalTitle">Edit bookshelft</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modalBody">
                            <label>Name</label>
                            <input type='text' placeholder="Bookshelf name" value={nameBookshelf} onChange={handleNameBookshelfModal} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="modalFooter">
                            <Button className="buttonCancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button className="buttonAdd" onClick={handleEditModal}>
                                Edit
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </section>

            <Footer />
        </div>
    )
}

export default BookshelfDetails;