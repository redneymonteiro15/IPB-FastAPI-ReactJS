const URL_API = 'http://127.0.0.1:8000/';

export const getInfoUser = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}user/?id=${id}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}
export const updateUser = (id, cell_phone) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}user/?id=${id}&cell_phone=${cell_phone}`, {
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