import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css';
import * as Icon from 'react-bootstrap-icons'
import { getBorrowedByStatus } from "../../action/API/borrowed";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../action/API/setup";

function Borrowed() {
    const navigate = useNavigate();

    const [currentButton, setCurrentButton] = useState('borrowed');

    const [books, setBooks] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        handleBorrowedButtonClick()
        
        const u = getUserData()
        setUser(u)
    }, [])

    const handleBorrowedButtonClick = () => {
        setCurrentButton('borrowed');
        if(user !== null)
            getBorrowedByStatus(user.id, true)
                .then((data) => setBooks(data))
    };
    
    const handleReturnedButtonClick = () => {
        setCurrentButton('returned');
        if(user !== null)
            getBorrowedByStatus(user.id, false)
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
