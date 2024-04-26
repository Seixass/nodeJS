const inputURL = 'https://www.example.com/path/to/resource?param1=value1#section';

const parsedURL = new URL(inputURL);

console.log('Protocolo:', parsedURL.protocol);
console.log('Nome do host:', parsedURL.hostname);
console.log('Caminho da URL:', parsedURL.pathname);

if (parsedURL.searchParams) {
    console.log('Parâmetros de consulta:', parsedURL.searchParams.toString());
}

if (parsedURL.hash) {
    console.log('Fragmento da URL:', parsedURL.hash);
}