const URL_API = 'https://api-redneymonteiro15-3880-redney-monteiros-projects.vercel.app/user/';

export const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    fetch(URL_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(error => reject('Error: ', error));
  });
};


export const getInfoUser = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}?id=${id}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error: :', error));
    })
}
export const getIdUserByUsername = (email) => {
  return new Promise((resolve, reject) => {
      fetch(`${URL_API}?email=${email}`)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => reject('Error: :', error));
  })
}
export const updateUser = (id, cell_phone) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}?id=${id}&cell_phone=${cell_phone}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error: ', error));
    })
}

export const changePassword = (id, password, newPassword) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}?id=${id}&password=${password}&new_password=${newPassword}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject('Error: ', error));
    })
}