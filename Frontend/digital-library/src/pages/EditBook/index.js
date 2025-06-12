import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { navigationTo } from "../../action/constant/function";
import { getBookById, updateBook } from "../../action/API/book";
import { useLocation } from "react-router-dom";

function EditBook(){
    const { search } = useLocation();

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isbn, setISBN] = useState('')
    const [pages, setPages] = useState('')
    const [category, setCategory] = useState('')
    const [published, setPublished] = useState('')
    const [publicationDate, setPublicationDate] = useState("")
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState("")

    const [validName, setValidName] = useState(null)
    const [validDescription, setValidDescription] = useState(null)
    const [validISBN, setValidISBN] = useState(null)
    const [validPages, setValidPages] = useState(null)
    const [validCategory, setValidCategory] = useState(null)
    const [validPublished, setValidPublished] = useState(null)
    const [validPublicationDate, setValidPublicationDate] = useState(null)
    const [validAuthor, setValidAuthor] = useState(null)
    const [validImage, setValidImage] = useState(null)

    const [res, setRes] = useState(null)

    useEffect(() => {

        const searchParams = new URLSearchParams(search);
        const data = searchParams.get('id');
        setId(data);

        if (data == null) {
            window.location.href = '/book';
        }

        getBookById(data).then((data) => {
            setName(data.name);
            setDescription(data.description);
            setISBN(data.isbn);
            setPages(data.pages);
            setCategory(data.category);
            setPublished(data.published);
            setPublicationDate(data.publication_date);
            setAuthor(data.author);
            setImage(data.image_url);
        })
    }, [])

    const errors = useState({})

    const editBook = () => {
        const book = {
            id: id,
            name: name,
            description: description,
            pages: parseInt(pages),
            publication_date: publicationDate,
            published: published,
            isbn: isbn,
            category: category,
            author: author,
            image_url: image
        };
        updateBook(book).then(res => {
            console.log("Atualizado com sucesso")
            setRes(res);
        }).catch((error) => {
            console.error("Erro ao atualizar o book");
            setRes(res);
        })
    }

    useEffect(() => {
        let timer;
        if (res !== null) {
            window.scrollTo(0, 0);  // Adicione esta linha para rolar ao topo
            timer = setTimeout(() => {
                setRes(null);
            }, 5000);  //wait 5s
        }

        return () => clearTimeout(timer);
    }, [res]);

    return(
        <div>
            <Header pageName={'Edit book'} />

            <section className="add-book-details">
                <div>
                    <h3><Icon.ArrowLeft className="iconBack" onClick={() => navigationTo('book')}/> Edit book</h3>
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
                    <label>Author</label>
                    <input type="text" placeholder='Author name' value={author} onChange={(event) => setAuthor(event.target.value)} className={errors.author ? 'inputError' : 'input'} />
                    <label>Link image</label>
                    <input type="url" placeholder='www.image.com' value={image} onChange={(event) => setImage(event.target.value)} className={validImage === false ? 'inputError' : 'input'} min={1700}/>
                    <p>{errors.image}</p>
                    <p>{errors.res}</p>
                    <button className="btUpdate" onClick={() => editBook()}>
                        edit book
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default EditBook;