

const URL_API = 'https://api-9k1h9hp9z-redney-monteiros-projects.vercel.app/'

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

export const saveUserData = (user) => {
    const userJSON = JSON.stringify(user);
    sessionStorage.setItem('user', userJSON);
}

export const getUserData = () => {
    const userJSON = sessionStorage.getItem('user');
    return JSON.parse(userJSON);
}
  
export const deleteUserData = () => {
    sessionStorage.removeItem('user');
}
