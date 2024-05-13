import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import * as Icon from 'react-bootstrap-icons'
import { Modal, Button } from 'react-bootstrap';
import './styles.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteBookshelf, getAllBookshelfByIdUser, getBookshelfById, updateBookshelf } from "../../action/API/bookshelf";
import { deleteBookInBookshelf, getBookInBookshelfByIdBookshelf } from "../../action/API/bookInBookshelf";
import { getUserData } from "../../action/API/setup";

function BookshelfDetails() {
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    const { search } = useLocation();

    const [books, setBooks] = useState([])
    const [bookshelf, setBookshelf] = useState(null)
    const [searchBookName, setSearchBookName] = useState('')

    const [id, setId] = useState()
    
    const[showModal, setShowModal] = useState(false)
    const [nameBookshelf, setNameBookshelf] = useState('')

    const [res, setRes] = useState(null)

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

        setBooks(b)

        const bo = {
            "_id": {
              "$oid": "6627f46bfc997a65a9818252"
            },
            "name": "Database",
            "date_create": {
              "$date": "2024-04-23T18:48:27.300Z"
            },
            "id_user": "66251e4eede07cfa79f98bf9"
          }
        setBookshelf(bo)

        /* const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data)

        const u = getUserData()
        setUser(u)

        if(data == null){
            window.location.href='/book'
        }

        getBookshelfById(data)
            .then((data) => setBookshelf(data))
            .catch((error) => console.error('Error fetching books:', error)) 


        console.log("id: " + data)
        getBookInBookshelfByIdBookshelf(data, 'All')
            .then(data => {
                setBooks(data)
            })
            .catch(error => console.error('Error fetching books:', error)); */
        
    }, [search])

    const handleSearchBook = (event) => {
        setSearchBookName(event.target.value)
    }

    const searchBook = () => {
        getBookInBookshelfByIdBookshelf(id, searchBookName)
            .then(data => {
                setBooks(data)
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleNameBookshelfModal = (event) => {
        setNameBookshelf(event.target.value)
    }
    
    const handleEditModal = () => {
        if(nameBookshelf.length !== 0){
            //
            updateBookshelf(id, nameBookshelf)
                .then(data => {
                    console.log('Bookshelf update successfully:', data);
                    setRes(true)
                    
                    getBookshelfById(id)
                        .then(data => setBookshelf(data))
                        .catch(error => console.error('Error fetching books:', error));
                
                }).catch(error => {
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

    const goBookshelfDetails = (id) => {
        navigate(`/book-details?id=${encodeURIComponent(id)}`);
    }

    const [idBook, setIdBook] = useState('')
    const [showModalDelte , setShowModalDelte] = useState(false);

    const handleModalDeleteClose = () => {
        setShowModalDelte(false)
    }
    const handleDelete = () => {
        deleteBookInBookshelf(idBook, bookshelf.id)
        .then((data)=> {
            setRes(data)
            getBookInBookshelfByIdBookshelf(bookshelf.id)
            .then(data => {
                setBooks(data)
            })
            .catch(error => console.error('Error fetching books:', error));
        })
        handleModalDeleteClose()
    }
    const deleteBookInBookshelf_ = (idBook) => {
        setShowModalDelte(true)
        setIdBook(idBook)
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
                                            <h5 class="card-title" onClick={() => goBookshelfDetails(b.id)}>{b.name} <Icon.CaretRightFill /></h5>
                                            <Icon.Trash3Fill className="iconDelete" onClick={() => deleteBookInBookshelf_(b.id)}/>
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

                <Modal className="modal" show={showModalDelte} onHide={handleModalDeleteClose}>
                <Modal.Header closeButton>
                <Modal.Title className="modalTitle">Add bookshelft</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modalBody">
                        <label className="text-center">Are you sure you want to delete a book in bookshelf?</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modalFooter">
                        <Button className="buttonCancel" onClick={handleModalDeleteClose}>
                            Close
                        </Button>
                        <Button className="buttonAdd" onClick={handleDelete}>
                            Delete
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