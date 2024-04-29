const URL_API = 'http://127.0.0.1:8000/';


export const getAllBooks = () => {
    return new Promise((resolve, reject) => {      
        fetch(`${URL_API}book/`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
};

export const getBookById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book/?id=${id}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}

export const getBookByName = (name) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book/?name=${name}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}

export const getBookByCategory = (category) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book/?category=${category}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}

export const getBookByCategoryAndName = (category, name) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}book/?category=${category}&name=${name}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching books:', error));
    })
}

export const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}category/`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error fetching categories:', error));
    })
}