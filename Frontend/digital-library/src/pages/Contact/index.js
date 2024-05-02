import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import { insertComment } from "../../action/API/comment";

function Contact(){

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successfullyMessage, setSuccessfullyMessage] = useState('')

    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendComment = () => {
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email');
            return;
        }

        if (message.trim() === '') {
            setErrorMessage('Message cannot be empty');
            return;
        }

        setErrorMessage('');

        insertComment(email, message, new Date())
            .then((res) => {
                setSuccessfullyMessage("Your comment has been sent successfully!");
            })
            .catch((err) => { 
                setErrorMessage(err)
            })
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const ContactCard = ({ contact }) => (
        <div className="card">
          <div class="card-header">
            {contact.title}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{contact.name}</li>
                <li class="list-group-item">{contact.position}</li>
                <li class="list-group-item">Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li class="list-group-item">Telefone: <a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
                <li class="list-group-item">Ext. {contact.extension}</li>
            </ul>
        </div>
      );

      const contacts = [
        {
          title: 'Responsável',
          name: 'Clarisse Pais',
          position: 'Técnico Superior',
          email: 'clarisse@ipb.pt',
          phone: '+351273303387',
          extension: '3387',
        },
        // Add more contacts here...
      ];

    return(
        <div>
            <Header pageName={'Contact'} />

            <section className="contact">
                <h2>Contact</h2>
                <aside className="row">
                    <div className="col aside-comment">
                        <h3>Send comment</h3>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className={errorMessage && !validateEmail(email) ? 'errorBorder' : 'normalBorder'}  />
                        <label>Message</label>
                        <textarea value={message} onChange={handleMessage} className={errorMessage && !validateEmail(email) ? 'errorBorder' : 'normalBorder'}  />
                        {errorMessage && <p className="txError">{errorMessage}</p>}
                        {successfullyMessage && <p className="txtSuccessfully">{successfullyMessage}</p>}
                        <button onClick={sendComment}>Send</button>
                    </div>
                    
                    <div className="col aside-contact" >
                        <div id="contact">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#esa">ESA</a>
                                
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#ese">ESE</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#estig">ESTiG</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#esact">EsACT</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#essa">ESSa</a>
                            </li>
                        </ul>
                        </div>
                        <div data-bs-spy="scroll" data-bs-target="#contact" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scroll scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
                        <h4 id="esa">ESA</h4>
                        
                        {contacts.map((contact, index) => (
                            <ContactCard key={index} contact={contact} />
                        ))}
                        <h4 id="ese">Second heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="estig">Third heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="esact">Fourth heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="essa">Fifth heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        </div>
                    </div>
                </aside>
            </section>

            <Footer />
        </div>
    )
}

export default Contact;