import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { navigationTo } from "../../action/constant/function";
import HeaderAdmin from "../../components/headerAdmin";

function AddBookDetails(){

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isbn, setISBN] = useState('')
    const [pages, setPages] = useState('')
    const [category, setCategory] = useState('')
    const [published, setPublished] = useState('')
    const [publicationDate, setPublicationDate] = useState('')
    const [image, setImage] = useState('')

    const [validName, setValidName] = useState(null)
    const [validDescription, setValidDescription] = useState(null)
    const [validISBN, setValidISBN] = useState(null)
    const [validPages, setValidPages] = useState(null)
    const [validCategory, setValidCategory] = useState(null)
    const [validPublished, setValidPublished] = useState(null)
    const [validPublicationDate, setValidPublicationDate] = useState(null)
    const [validImage, setValidImage] = useState(null)

    const errors = useState({})

    const addBook = () => {

    }

    return(
        <div>
            <HeaderAdmin pageName={'Add book details'} />

            <section className="add-book-details">
                <div>
                    <h3><Icon.ArrowLeft className="iconBack" onClick={() => navigationTo('add-book')}/> Add book</h3>
                    <label>Name</label>
                    <input type="text" placeholder='name' value={name} onChange={(event) => setName(event.target.value)} className={validName === false ? 'inputError' : 'input'}/>
                    <p>{errors.name}</p>
                    <label>Description</label>

                    <textarea placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}  className={validDescription === false ? 'inputError' : 'input'}>
                    </textarea>
                    <p>{errors.description}</p>

                    <label>ISBN</label>
                    <input type="text" placeholder='00000-000' value={isbn} onChange={(event) => setISBN(event.target.value)} className={validISBN === false ? 'inputError' : 'input'}/>
                    <p>{errors.isbn}</p>

                    <label>Pages</label>
                    <input type="number" placeholder='0' value={pages} onChange={(event) => setPages(event.target.value)} className={validPages === false ? 'inputError' : 'input'} min={0}/>
                    <p>{errors.pages}</p>

                    <label>Category</label>
                    <select className={validPages === false ? 'inputError' : 'input'}>
                        <option>Programmer</option>
                        <option>Database</option>
                    </select>
                    <p>{errors.category}</p>

                    <label>Published</label>
                    <input type="text" placeholder='published' value={published} onChange={(event) => setPublished(event.target.value)} className={validPublished === false ? 'inputError' : 'input'}/>
                    <p>{errors.published}</p>

                    <label>Publication date</label>
                    <input type="number" placeholder='2000' value={publicationDate} onChange={(event) => setPublicationDate(event.target.value)} className={validPublicationDate === false ? 'inputError' : 'input'} min={1700}/>
                    <p>{errors.publicationDate}</p>

                    <label>Link image</label>
                    <input type="url" placeholder='www.image.com' value={image} onChange={(event) => setImage(event.target.value)} className={validImage === false ? 'inputError' : 'input'} min={1700}/>
                    <p>{errors.image}</p>
                    <p>{errors.res}</p>
                    <button className="btUpdate" onClick={() => addBook()}>
                        Add book
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default AddBookDetails;