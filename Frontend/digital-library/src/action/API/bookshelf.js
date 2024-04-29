const URL_API = 'http://127.0.0.1:8000/'


export const addBookshelf = (name, idUser) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}bookshelf/?name=${name}&id_user=${idUser}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, })
            .then(response => { return response.json(); })
            .then(data => resolve(data))
            .catch(error => reject('Error inserting bookshelf', error));

    })
}

export const getAllBookshelfByIdUser = (idUser) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}bookshelf/?id_user=${idUser}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}

export const getBookshelfById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}bookshelf/?id=${id}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
            
    })
}

export const updateBookshelf = (idBookshelf, name) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}bookshelf/?id_bookshelf=${idBookshelf}&name=${name}`, {
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