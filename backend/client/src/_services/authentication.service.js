import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    signup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/user/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // console.log(JSON.stringify(user))
            currentUserSubject.next(user);

            return user;
        });
}

function signup(name, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: name, email, password })
    };

    return fetch(`${config.apiUrl}/user/signup`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
            //window.location.replace("http://stackoverflow.com");
        })
        .catch((err) => {
            return err;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
