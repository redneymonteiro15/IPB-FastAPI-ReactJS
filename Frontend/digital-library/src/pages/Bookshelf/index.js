import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import * as Icon from 'react-bootstrap-icons'
import { Modal, Button } from 'react-bootstrap';

import './styles.css'
import { useNavigate } from "react-router-dom";
import { addBookshelf, getAllBookshelfByIdUser } from "../../action/API/bookshelf";

function Bookshelf(){
    const navigate = useNavigate();

    const [bookshelf, setBookshelf] = useState([]);
    const [nameBookshelf, setNameBookshelf] = useState('')

    useEffect(() => {
        getAllBookshelfByIdUser('66251e4eede07cfa79f98bf9')
            .then(data => setBookshelf(data))
            .catch(error => console.error('Error fetching books:', error));
    }, [])

    const goBookshelfDetails = (id) => {
        navigate(`/bookshelf-details?id=${encodeURIComponent(id)}`);
    }

    const handleNameBookshelf = (event) => {
        setNameBookshelf(event.target.value)
    }

    const addBookshelf_ = () => {
        setShow(true)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const [res, setRes] = useState(null)
    
    const handleAdd = () => {
        addBookshelf(nameBookshelf, '66251e4eede07cfa79f98bf9')
        .then(response => {
            console.log('Bookshelf inserted successfully:', response);
            setRes(true)
            getAllBookshelfByIdUser('66251e4eede07cfa79f98bf9')
                .then(data => setBookshelf(data))
                .catch(error => console.error('Error fetching books:', error));
        })
        .catch((error) => setRes(error) )

        setNameBookshelf('')
        setShow(false)
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

      

    return(
        <div>
            <Header pageName={'My Bookshelf'}/>
    
            <section>
            <div class="row row-top">
                <div><span>Bookshelf</span><Icon.PlusCircleFill className="iconAdd" onClick={() => addBookshelf_()} /></div>
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
            <div class="row">
                {bookshelf.length == 0 
                    ?   <div className="cardNoFound">
                            <Icon.InfoCircle className="infoIcon" />	
                            <p>No bookshelf found!</p>
                        </div>
                    :   bookshelf.map(b => {
                            return(
                                <div class="col-sm-4">
                                    <div class="card">
                                        <div class="card-body" onClick={() => goBookshelfDetails(b.id)}>
                                            <h5 class="card-title">{b.name} <Icon.CaretRightFill /></h5>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })
                    
                }
                

            </div>
            </section>

            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="modalTitle">Add bookshelft</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modalBody">
                        <label>Name</label>
                        <input type='text' placeholder="Bookshelf name" value={nameBookshelf} onChange={handleNameBookshelf} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modalFooter">
                        <Button className="buttonCancel" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="buttonAdd" onClick={handleAdd}>
                            Save Changes
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
    
            <Footer />
        </div>
    )
}

export default Bookshelf;