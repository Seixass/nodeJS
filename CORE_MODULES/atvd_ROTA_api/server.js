const http = require('node:http');
const fs = require('node:fs');

const PORT = 3333;
const USERS_FILE = 'usuarios.txt';

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/cadastro') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const userData = JSON.parse(body);
            const { name, email, password } = userData;
            const userRecord = `Usuário: ${name},\nEmail:${email},\nSenha:${password}\n`;

            fs.appendFile(USERS_FILE, userRecord, (err) => {
                if (err) {
                    console.error('Erro ao salvar usuário:', err);
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write('Erro interno no servidor');
                    return response.end();
                }
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.write(JSON.stringify({ message: 'Usuário cadastrado com sucesso!' }));
                return response.end();
            });
        });
    } else if (request.method === 'GET' && request.url === '/lista-usuarios') {
        fs.readFile(USERS_FILE, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao carregar usuários:', err);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write('Erro interno no servidor');
                return response.end();
            }
            const usuarios = data.trim().split('\n');
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(usuarios));
            return response.end();
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        return response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Servidor on PORT: ${PORT}`);
});
