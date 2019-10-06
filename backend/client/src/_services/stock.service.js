import config from 'config';
import { handleResponse, authHeader } from '@/_helpers';

export const stockService = {
    getStocks
}

function getStocks(symbols) {
    const symbolString = '?symbol='.concat(symbols.join());
    const requestOptions = { method: 'GET', headers: authHeader()};
    return fetch(config.apiUrl.concat('/stock',symbolString), requestOptions).then(handleResponse);
}