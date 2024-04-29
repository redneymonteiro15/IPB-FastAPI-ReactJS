

const URL_API = 'http://127.0.0.1:8000/'

export const signInAPI = (username, password) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}user/?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to sign in');
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.message);
        });
    });
};

export const saveUserData = (username) => {
    sessionStorage.setItem('username', username)
}

export const getUserData = () => {
    const res = sessionStorage.getItem('username')

    return res;
}

/* export const gettAllBooks = () => {
    return new Promise((resolve, reject) => {
        fetch.
    })
} */

/*
useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const data = searchParams.get('id');
    setId(data)

    if(data == null){
        window.location.href='/book'
    }

    fetch('http://127.0.0.1:8000/getBookById?id='+data)
        .then(response => response.json())
        .then(data => setBook(data))
        .catch(error => console.error('Error fetching books:', error));
    
    fetch('http://127.0.0.1:8000/getAllBookshelf?id_user=66251e4eede07cfa79f98bf9')
        .then(response => response.json())
        .then(data => setBookshelf(data))
        .catch(error => console.error('Error fetching books:', error));
    
    fetch('http://127.0.0.1:8000/getBookInBookshelfByIdBook?id_book='+data+'&id_user=66251e4eede07cfa79f98bf9')
        .then(response => response.json())
        .then(data => {
            setMyBookshelf(data)
            console.log(data)
            console.log(myBookshelf)
            console.log(bookshelfName)
        })
        .catch(error => console.error('Error fetching books:', error));

    
    

}, []) */