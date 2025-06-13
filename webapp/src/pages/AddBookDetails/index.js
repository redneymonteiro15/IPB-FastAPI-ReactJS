import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css';
import * as Icon from 'react-bootstrap-icons';
import { navigationTo } from "../../action/constant/function";
import { createBook } from "../../action/API/book";

function AddBookDetails() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isbn, setISBN] = useState('');
    const [pages, setPages] = useState('');
    const [category, setCategory] = useState('Programmer'); // Valor inicial padrão
    const [published, setPublished] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState({});

    const [res, setRes] = useState(null)

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!name) {
            errors.name = "Name is required";
            valid = false;
        }
        if (!description) {
            errors.description = "Description is required";
            valid = false;
        }
        if (!isbn) {
            errors.isbn = "ISBN is required";
            valid = false;
        }
        if (!pages || pages <= 0) {
            errors.pages = "Pages must be greater than 0";
            valid = false;
        }
        if (!category) {
            errors.category = "Category is required";
            valid = false;
        }
        if (!published) {
            errors.published = "Published is required";
            valid = false;
        }
        if (!publicationDate || publicationDate < 1700) {
            errors.publicationDate = "Publication date must be greater than 1700";
            valid = false;
        }
        if (!author){
            errors.author = "Author is required"
            valid = false;
        }
        if (!image) {
            errors.image = "Image URL is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

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

    const addBook = async () => {
        if (!validateForm()) return;

        const book = {
            id: "",
            name: name,
            description: description,
            pages: parseInt(pages),
            publication_date: publicationDate,
            published: published,
            isbn: isbn,
            author: author,
            category: category,
            image_url: image
        };

        createBook(book).then((res) => {
            if(res == true){
                setName('')
                setDescription('')
                setPages(0)
                setPublicationDate('')
                setPublished('')
                setISBN('')
                setAuthor('')
                setCategory('')
                setImage('')
            }
            setRes(res)

        }).catch((error) => {
            setRes(false)
        })
    };

    return (
        <div>
            <Header pageName={'Add book details'} />
            <section className="add-book-details">
                <div>
                    <h3><Icon.ArrowLeft className="iconBack" onClick={() => navigationTo('add-book')} /> Add book</h3>
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
                    <input type="text" placeholder='name' value={name} onChange={(event) => setName(event.target.value)} className={errors.name ? 'inputError' : 'input'} />
                    <p>{errors.name}</p>
                    <label>Description</label>
                    <textarea placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} className={errors.description ? 'inputError' : 'input'} />
                    <p>{errors.description}</p>
                    <label>ISBN</label>
                    <input type="text" placeholder='00000-000' value={isbn} onChange={(event) => setISBN(event.target.value)} className={errors.isbn ? 'inputError' : 'input'} />
                    <p>{errors.isbn}</p>
                    <label>Pages</label>
                    <input type="number" placeholder='0' value={pages} onChange={(event) => setPages(event.target.value)} className={errors.pages ? 'inputError' : 'input'} min={0} />
                    <p>{errors.pages}</p>
                    <label>Category</label>
                    <select value={category} onChange={(event) => setCategory(event.target.value)} className={errors.category ? 'inputError' : 'input'}>
                        <option>Programmer</option>
                        <option>Database</option>
                    </select>
                    <p>{errors.category}</p>
                    <label>Published</label>
                    <input type="text" placeholder='published' value={published} onChange={(event) => setPublished(event.target.value)} className={errors.published ? 'inputError' : 'input'} />
                    <p>{errors.published}</p>
                    <label>Publication date</label>
                    <input type="number" placeholder='2000' value={publicationDate} onChange={(event) => setPublicationDate(event.target.value)} className={errors.publicationDate ? 'inputError' : 'input'} min={1700} />
                    <p>{errors.publicationDate}</p>
                    <label>Author</label>
                    <input type="text" placeholder='Author name' value={author} onChange={(event) => setAuthor(event.target.value)} className={errors.author ? 'inputError' : 'input'} />
                    <label>Link image</label>
                    <input type="url" placeholder='www.image.com' value={image} onChange={(event) => setImage(event.target.value)} className={errors.image ? 'inputError' : 'input'} />
                    <p>{errors.image}</p>
                    <p>{errors.res}</p>
                    <button className="btUpdate" onClick={addBook}>Add book</button>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AddBookDetails;
