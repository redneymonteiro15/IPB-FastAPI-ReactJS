

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

export const saveUserData = (id) => {
    sessionStorage.setItem('id', id)
}

export const getUserData = () => {
    const res = sessionStorage.getItem('id')

    return res;
}

export const deleteUserData = () => {
    sessionStorage.removeItem('id');
}
