const url = require('url');

const protocol = 'http';
const host = 'api.example.com';
const path = '/data';
const queryParams = {
    param1: 'value1',
    param2: 'value2'
};

const constructedUrl = url.format({
    protocol,
    host,
    pathname: path,
    query: queryParams
});

console.log('URL:', constructedUrl);