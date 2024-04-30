const URL_API = 'http://127.0.0.1:8000/';

export const insertBookInBookshelf = (idBook, idBookshelf) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?id_book=${idBook}&id_bookshelf=${idBookshelf}`, { method: 'POST', headers: { 'Content-Type':  'application/json' }, })
            .then(response =>  response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

export const getBookInBookshelf = (idBook, idUser) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?id_book=${idBook}&id_user=${idUser}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error inserting bookshelf', error));
    })
}

export const getBookInBookshelfByIdBookshelf = (idBookshelf) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?id_bookshelf=${idBookshelf}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error inserting bookshelf', error));
    })
}

export const updateBookInBookshelf = (lastId, newId, idBook) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?last_id_bookshelf=${lastId}&new_id_bookshelf=${newId}&id_book=${idBook}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error inserting bookshelf', error));
    })
}

export  const deleteBookInBookshelf = (idBook, idBookshelf) => {   
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?id_book=${idBook}&id_bookshelf=${idBookshelf}`, { 
            method: 'DELETE', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
        })
        .then(response => { return response.json(); })
        .then(data => resolve(data))
        .catch(error => reject('Error inserting bookshelf', error));
    })
}

export const getBookInBookshelfByIdBook = (idBook, idUser) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book-in-bookshelf/?id_book=${idBook}&id_user=${idUser}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error inserting bookshelf', error));
    })
}