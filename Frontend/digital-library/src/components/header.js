import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import './styles.css'
import * as Icon from 'react-bootstrap-icons'

import logo from '../assets/logo.png'

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="home"><img src={logo} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="book">Book</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="bookshelf">Bookshlef</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="borrowed">Borrowed</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="profile"><Icon.Person className="icon-profile" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
