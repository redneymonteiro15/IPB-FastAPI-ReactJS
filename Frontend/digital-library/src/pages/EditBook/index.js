import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { navigationTo } from "../../action/constant/function";
import HeaderAdmin from "../../components/headerAdmin";

function EditBook(){

    const [name, setName] = useState('The C++ Programming Language')
    const [description, setDescription] = useState('The definitive reference to C++ by the creator of C++, The C++ Programming Language teaches one of the most widely-used, general-purpose programming languages. At an advanced pace this book teaches how to work with compilers updated for the new standard. Students with experience with C++ heading toward domains where mid-size to large applications are being developed - networking, finance, graphics, and games - will find this book an excellent learning tool.')
    const [isbn, setISBN] = useState('4325513251')
    const [pages, setPages] = useState('416')
    const [category, setCategory] = useState('Programmer')
    const [published, setPublished] = useState('TAG Livros - Paralela')
    const [publicationDate, setPublicationDate] = useState('2019')
    const [image, setImage] = useState('https://static.fnac-static.com/multimedia/Images/PT/NR/99/2b/16/1452953/1540-1.jpg')

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
            <HeaderAdmin pageName={'Edit book'} />

            <section className="add-book-details">
                <div>
                    <h3><Icon.ArrowLeft className="iconBack" onClick={() => navigationTo('book')}/> Edit book</h3>
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
                        edit book
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default EditBook;