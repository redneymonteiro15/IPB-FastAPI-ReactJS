import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import * as Icon from 'react-bootstrap-icons'
import { Modal, Button } from 'react-bootstrap';

import './styles.css'
import { useNavigate } from "react-router-dom";
import { addBookshelf, deleteBookshelf, getAllBookshelfByIdUser } from "../../action/API/bookshelf";
import { getUserData } from "../../action/API/setup";

function Bookshelf(){
    const [user, setser] = useState(null)

    const navigate = useNavigate();

    const [bookshelf, setBookshelf] = useState([]);
    const [nameBookshelf, setNameBookshelf] = useState('')

    const [idBookshelf, setIdBookshelf] = useState('')

    useEffect(() => {
        const u = getUserData()
        getAllBookshelfByIdUser(u.id)
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
    const [showModalDelte , setShowModalDelte] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const handleModalDeleteClose = () => {
        setShowModalDelte(false)
    }

    const [res, setRes] = useState(null)
    
    const handleAdd = () => {
        addBookshelf(nameBookshelf, user.id)
        .then(response => {
            console.log('Bookshelf inserted successfully:', response);
            setRes(true)
            getAllBookshelfByIdUser(user.id)
                .then(data => setBookshelf(data))
                .catch(error => console.error('Error fetching books:', error));
        })
        .catch((error) => setRes(error) )

        setShowModalDelte(false)
        
    }

    const handleDelete = () => {
        deleteBookshelf(idBookshelf)
        .then((data)=> {
            setRes(data)
            getAllBookshelfByIdUser(user.id)
                .then(data => setBookshelf(data))
                .catch(error => console.error('Error fetching books:', error));
        })
        handleModalDeleteClose()
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

    const deleteBookshelf_ = (idBookshelf) => {
        setShowModalDelte(true)
        setIdBookshelf(idBookshelf)
    }
      

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
                                <div class="col-sm-5">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title" onClick={() => goBookshelfDetails(b.id)}>{b.name} <Icon.CaretRightFill /></h5>
                                            <Icon.Trash3Fill className="iconDelete" onClick={() => deleteBookshelf_(b.id)}/>
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
                            Add
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
                        <label className="text-center">Are you sure you want to delete bookshelf?</label>
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
    
            <Footer />
        </div>
    )
}

export default Bookshelf;