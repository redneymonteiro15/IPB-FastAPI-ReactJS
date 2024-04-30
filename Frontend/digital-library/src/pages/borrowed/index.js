import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css';
import * as Icon from 'react-bootstrap-icons'
import { getBorrowedByStatus } from "../../action/API/borrowed";
import { useNavigate } from "react-router-dom";

function Borrowed() {
    const navigate = useNavigate();

    const [currentButton, setCurrentButton] = useState('borrowed');

    const [books, setBooks] = useState([])
    const [idUser, setIdUser] = useState('66251e4eede07cfa79f98bf9');

    useEffect(() => {
        handleBorrowedButtonClick()
            
    }, [])

    const handleBorrowedButtonClick = () => {
        setCurrentButton('borrowed');
        getBorrowedByStatus(idUser, true)
            .then((data) => setBooks(data))
    };
    
    const handleReturnedButtonClick = () => {
        setCurrentButton('returned');
        getBorrowedByStatus(idUser, false)
            .then((data) => setBooks(data))
    };

    const openBook = (id) => {
        navigate(`/book-details?id=${encodeURIComponent(id)}`);
    }

    return(
        <div>
            <Header pageName={'Borrowed'} />
            
            <section className="borrowed">
                <aside>
                    <h2>Borrowed</h2>
                    <div className="card-top">
                        <button className={currentButton === 'borrowed' ? 'currentButton' : 'lastButton'} onClick={handleBorrowedButtonClick} >
                            Borrowed
                        </button>
                        <button className={currentButton === 'returned' ? 'currentButton' : 'lastButton'} onClick={handleReturnedButtonClick}>
                            Returned
                        </button>
                    </div>
                </aside>
                <aside>
                    {books.length == 0 
                        ?   <div className="cardNoFound">
                                <Icon.InfoCircle className="infoIcon" />	
                                <p>No book borrowed found!</p>
                            </div>
                        :   books.map((b) => (
                            <div className={`row g-0 ${b.status == 'false' ? '' : new Date(b.returned_date) < new Date() && ( 'row-later' )}`}>
                                <div class="col-md-4">
                                    <img src='../../assets/favicon.png' class="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title" onClick={() => openBook(b.book.id)}>{b.book.name}</h5>
                                        <p class="card-author">{b.book.author}</p>
                                        <div className="card-borrowed">
                                            <div>
                                                <h5>Borrow date</h5>
                                                <p><Icon.Calendar3 /> {b.borrowed_date}</p>
                                            </div>
                                            <div>
                                                <h5>Return date</h5>
                                                <p><Icon.Calendar3 /> {b.returned_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        
                        
                    }
                </aside>
            </section>

            <Footer />
        </div>
    );
}

export default Borrowed;
