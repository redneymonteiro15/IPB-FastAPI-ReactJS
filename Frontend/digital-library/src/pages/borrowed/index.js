import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css';
import * as Icon from 'react-bootstrap-icons'

function Borrowed() {
    const [currentButton, setCurrentButton] = useState('borrowed');

    useEffect

    const handleBorrowedButtonClick = () => {
        setCurrentButton('borrowed');
    };
    
    const handleReturnedButtonClick = () => {
        setCurrentButton('returned');
    };

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
                <div className="row g-0">
                    <div class="col-md-4">
                        <img src='../../assets/favicon.png' class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">name</h5>
                        <p class="card-author">author</p>
                        <div className="card-borrowed">
                            <div>
                                <h5>Borrow date</h5>
                                <p><Icon.Calendar3 /> 2024-04-04</p>
                            </div>
                            <div>
                                <h5>Return date</h5>
                                <p><Icon.Calendar3 /> 2024-04-04</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </aside>
            </section>

            <Footer />
        </div>
    );
}

export default Borrowed;
