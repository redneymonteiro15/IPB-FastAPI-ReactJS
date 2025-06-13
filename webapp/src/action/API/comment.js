const URL_API = 'http://127.0.0.1:8000/'

export const insertComment = (email, message, date) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}comment/?email=${email}&message=${message}&date=${date}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },})
            .then(response =>  response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}