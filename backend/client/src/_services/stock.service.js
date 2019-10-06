import config from 'config';
import { handleResponse } from '@/_helpers';

export const stockService = {
    getStocks
}

function getStocks(symbols) {
    const symbolString = '?symbol='.concat(symbols.join());
    const requestOptions = { method: 'GET'};
    return fetch(apiUrl.concat('/stock',symbolString), requestOptions).then(handleResponse);
}