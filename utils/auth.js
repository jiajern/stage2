const axios = require('axios');

function signin(email, password) {
    axios.post('http://localhost:8000/api/user/signin', {
        email: email,
        password: password
    })
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(err);
    })
}

function signup(email, password) {
    axios.post('http://localhost:8000/api/user/signup', {
        email: email,
        password: password
    })
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(err);
    })
}

signup("test6@gmail.com", "test6")

module.exports = signin;