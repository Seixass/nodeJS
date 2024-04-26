const fs = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end('Erro interno do servidor');
            return;
        }
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
});

server.listen(3333, () => {
    console.log('Servidor on PORT 3333');
});
