
API = 'http://127.0.0.1:8000/'

export const getBorrowedByStatus = (id_user, status) => {
    return new Promise((resolve, reject) => {
        fetch(API + 'getBorrowedByStatus?status=' + status + '&id_user=' + id_user)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                reject(error);
            });
    });
}
