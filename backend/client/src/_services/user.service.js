import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import { authenticationService } from '@/_services';

export const userService = {
    getUser
};

function getUser() {
    const userId = authenticationService.currentUserValue.userId;
    //console.log(userId);
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/user/${userId}`, requestOptions).then(handleResponse);
}