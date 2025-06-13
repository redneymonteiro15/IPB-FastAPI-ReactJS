
const URL_API = 'http://127.0.0.1:8000/'

export const getBorrowedByStatus = (idUser, status) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}borrowed/?id_user=${idUser}&status=${status}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const getBookIsBorrowed = (idUser, idBook) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}borrowed/?id_user=${idUser}&id_book=${idBook}`)
            .then(response =>  response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const insertBorrowed = (idBook, idUser, borrowDate, returnedDate) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}borrowed/?id_book=${idBook}&id_user=${idUser}&borrow_date=${borrowDate}&returned_date=${returnedDate}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },})
            .then(response =>  response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}


