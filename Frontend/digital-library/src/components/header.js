import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import * as Icon from 'react-bootstrap-icons'

import logo from '../assets/logo.png'
import favicon_logo from '../assets/favicon.png'
import { getUserData } from "../action/API/setup";
import './styles.css'

function Header(props) {

    const {pageName} = props

    const [userData, setUserData] = useState('');

    useEffect(() => {

        const res = getUserData()
        if(res !== null){
            setUserData("Hello " + res)
            
        } else {
            window.location.href = '/'
        }
        configPage()
    }, [])

    const configPage = () => {
        const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = favicon_logo;

    // Altera o título da página
    document.title = pageName + ' - IPB Library Digital';
    }

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
    <a className={pageName === 'Home' ? 'nav-link link-active' : 'nav-link'} href="home">Home</a>
</li>
<li className="nav-item">
    <a className={pageName === 'Book' ? 'nav-link link-active' : 'nav-link'} href="book">Book</a>
</li>
<li className="nav-item">
    <a className={pageName === 'Bookshelf' ? 'nav-link link-active' : 'nav-link'} href="bookshelf">Bookshelf</a>
</li>
<li className="nav-item">
    <a className={pageName === 'Borrowed' ? 'nav-link link-active' : 'nav-link'} href="borrowed">Borrowed</a>
</li>
<li className="nav-item">
    <a className={pageName === 'Contact' ? 'nav-link link-active' : 'nav-link'} href="contact">Contact</a>
</li>

                            <li className="nav-item">
                                <a className="nav-link" href="profile"><Icon.Person className="icon-profile" />{userData}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
