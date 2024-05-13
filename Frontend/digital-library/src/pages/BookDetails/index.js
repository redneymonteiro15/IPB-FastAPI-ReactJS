import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useLocation } from 'react-router-dom';
import imgbook from '../../assets/book.jpg'
import { Modal, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import './styles.css'
import { getBookById } from "../../action/API/book";
import { getAllBookshelfByIdUser } from "../../action/API/bookshelf";
import { getBookInBookshelf, getBookInBookshelfByIdBook, insertBookInBookshelf, updateBookInBookshelf } from "../../action/API/bookInBookshelf";
import { getBookIsBorrowed, insertBorrowed } from "../../action/API/borrowed";
import { getUserData } from "../../action/API/setup";

function BookDetails() {
    
    const [user, setUser] = useState(null);
    
    const { search } = useLocation();
    const [id, setId] = useState()
    const [book, setBook] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [bookshelfName, setBookshelfName] = useState('')
    const [bookshelfID, setBookshelfID] = useState('')
    const [bookshelf, setBookshelf] =useState([])
    const [myBookshelf, setMyBookshelf] = useState(null)

    const [bookshelfIdSelect, setBookshelfIdSelect] = useState('')
    const [bookshelfNameSelect, setBookshelfNameSelect] = useState('')


    const [myBorrowed, setMyBorrowed] = useState(null)
    const [res, setRes] = useState(null)

    const [borrowedDate, setBorrowedDate] = useState('')
    const [returnedDate, setReturnedDate] = useState('')

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); 

    const twoDaysAfter = new Date(today);
    twoDaysAfter.setDate(twoDaysAfter.getDate() + 2); 

    useEffect(() => {
        const b = {
            "_id": "66262d1e8606915195d6bdb9",
            "name": "Programmer",
            "description": "The definitive reference to C++ by the creator of C++, The C++ Programming Language teaches one of the most widely-used, general-purpose programming languages. At an advanced pace this book teaches how to work with compilers updated for the new standard. Students with experience with C++ heading toward domains where mid-size to large applications are being developed - networking, finance, graphics, and games - will find this book an excellent learning tool.",
            "isbn": "4325513251",
            "pages": 416,
            "category": "Programmer",
            "author": "Bjarne Stoustrup",
            "published": "TAG Livros - Paralela",
            "publication_date": "2019"
          }

        setBook(b)
        /* const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data);

        if (data == null) {
            window.location.href = '/book';
        }

        const u = getUserData()
        setUser(u)

        
        getBookById(data)
            .then((data) => {
                setBook(data)
                console.log("Book: " + data)
            })
        
        getAllBookshelfByIdUser(u.id)
            .then((data) => setBookshelf(data))
        
        getBookInBookshelf(data, u.id)
            .then((data) =>  {
                setMyBookshelf(data)
                if (myBookshelf !== null){
                    setBookshelfNameSelect(myBookshelf.name)
                }
            })

        getBookIsBorrowed(u.id, data)
            .then((data) => setMyBorrowed(data)) */
        

    }, []);

    useEffect(() => {
        let timer;
        if (res !== null) {
            timer = setTimeout(() => {
                setRes(null);
            }, 5000);  //wait 5s
        }

        return () => clearTimeout(timer);
    }, [res]);


    const addBookToBookshelf = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleBookshelfChange = (selected) => {
        const [selectedId, selectedName] = selected.split(';');
    
        setBookshelfIdSelect(selectedId+'');
        setBookshelfNameSelect(selectedName);
        
        console.log('\nselectedId:'+ selectedId);
        console.log('selectedName:'+ selectedName);
        console.log('bookshelfIdSelect:', bookshelfIdSelect);
        console.log('bookshelfNameSelect:'+ bookshelfNameSelect);
    }
    
    
    
    const handleAddModal = () => {
        setBookshelfID(bookshelfIdSelect);
        setBookshelfName(bookshelfNameSelect);
        console.log("id:" + bookshelfIdSelect)
        console.log("id:"+bookshelfID)
        console.log("Name:" + bookshelfNameSelect)
        console.log("Name:"+bookshelfName)

        if(myBookshelf === null) {
            console.log('add')
            insertBookInBookshelf(id, bookshelfIdSelect)
                .then((data) => {
                    setRes(data)
                    getBookInBookshelf(book.id, user.id)
                        .then((data) => setMyBookshelf(data))
                })
                
        } else {
            console.log('update')
            console.log("ID: " + book.id)
            console.log("Last ID: " + myBookshelf.id)
            console.log("New ID: " + bookshelfIdSelect)

            updateBookInBookshelf(myBookshelf.id, bookshelfIdSelect, book.id)
                .then(data => {
                //setRes(true)
                getBookInBookshelfByIdBook(book.id, user.id)
                    .then(data => setMyBookshelf(data))
                })
                .catch(error => {
                console.error('Error inserting bookshelf:', error);
                });
        }
        setShowModal(false)
        
    }

    const borrowed = () => {
        
        console.log("Borrow date: " + borrowedDate)
        console.log("Return date: " + returnedDate)
        if(borrowedDate.length == 0 || returnedDate.length == 0 ){
            setRes(false)
            return
        }

        const borrowedTimestamp = new Date(borrowedDate).getTime(); 
        const returnedTimestamp = new Date(returnedDate).getTime(); 

        if (returnedTimestamp <= borrowedTimestamp) {
            setRes(false);
            console.log('invalid')
        } else {
            setRes(true);
            console.log('valid')
            //
            insertBorrowed(book.id, user.id, borrowedDate, returnedDate)
                .then(data => {
                    console.log(data)
                    setRes(data)
                    if(data == true){
                        getBookIsBorrowed(user.id, book.id)
                            .then((data) => setMyBorrowed(data)) 
                    }
                }).catch(error => {
                    console.error('Error inserting bookshelf:', error);
                });
        }

    }

    const handleBorrowedDate = (event) => {
        setBorrowedDate(event.target.value);
        
        if (returnedDate && event.target.value > returnedDate) {
            const tomorrow = new Date(event.target.value);
            tomorrow.setDate(tomorrow.getDate() + 1);
            setReturnedDate(tomorrow.toISOString().split('T')[0]);
        }
    };

    const handleReturnedDate = (event) => {
        setReturnedDate(event.target.value);
    };


    return (
        <div>
            <Header pageName={'Book Details'} />

            <section className="book-details">
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
                                        {res !== null && (
                                            res === true 
                                            ?   <div className="card-successfull">
                                                    <p><Icon.CheckCircle /> successfully</p>
                                                </div>
                                            :   <div className="card-error">
                                                    <p><Icon.XCircle /> Danger</p>
                                                </div>
                                        ) }

                                        {myBorrowed == null
                                            ?   <div className="card-borrowed">
                                                    <div>
                                                        <label>Borrowed date</label>
                                                        <input type="date" value={borrowedDate} onChange={handleBorrowedDate} min={tomorrow.toISOString().split('T')[0]} />
                                                    </div>
                                                    <div>
                                                        <label>Returned date</label>
                                                        <input 
                                                            type="date" 
                                                            value={returnedDate} 
                                                            onChange={handleReturnedDate} 
                                                            min={borrowedDate ? new Date(new Date(borrowedDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''} 
                                                        />
                                                    </div>

                                                    <div>
                                                        <button onClick={() => borrowed()}>
                                                            Borrowed
                                                        </button>
                                                    </div>
                                                </div>
                                            :   <div className="card-myBorrowed">
                                                    <p>The {myBorrowed.name} book was borrowed {myBorrowed?.borrowed_date} and should be delivered {myBorrowed?.returned_date}</p>
                                                </div>
                                        }
                                        
                                        <div className="card-ToAdd">
                                            {myBookshelf === null
                                                ?   <button onClick={() => addBookToBookshelf()}>
                                                        Add in <Icon.CaretDown className="icon-down" />
                                                    </button>
                                                :   <button onClick={() => addBookToBookshelf()}>
                                                        {myBookshelf?.name} <Icon.CaretDown className="icon-down" />
                                                    </button>
                                            }
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
                            
                            <select onChange={(event) => handleBookshelfChange(event.target.value)}>
                                <option disabled selected={myBookshelf === null}>Select bookshelf</option>
                                {bookshelf.map(b => (
                                    <option key={b.id} value={b.id+';'+b.name} selected={myBookshelf?.name === b.name} >
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="modalFooter">
                            <Button className="buttonCancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button className="buttonAdd" onClick={() => handleAddModal()}>
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
