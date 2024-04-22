


export const signInAPI = (username, password) => {
    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/signin?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to sign in');
            }
            return response.json();
        })
        .then((data) => {
            resolve(data); // Resolve a promessa com o valor retornado pela API (true ou false)
        })
        .catch((error) => {
            reject(error.message); // Rejeita a promessa com uma mensagem de erro
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

