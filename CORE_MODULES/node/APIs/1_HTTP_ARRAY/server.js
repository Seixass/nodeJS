//Métodos: GET, POST, PUT, PATH, DELETE, HEAD, OPTIONS
/*
*REQUISIÇÃO
1. corpo da requisição (request.body)

2. Parâmetro de busca (Search PARAMS, QUERY PARAMS)
http://localhost:0880/users/2: o 2 é um parâmetro de busca, ou seja, buscando um recurso especifico de um endpoint.

3. Parâmetros de ROTA (ROUTE PARAMS) - http://localhost:0880/users/1
*/

import { on } from 'node:events'
import http from 'node:http'

const PORT = 3333
const users = []
const server = http.createServer((request, response)=>{
    const {method, url} = request

    if(url === '/users' && method === "GET"){//Buscar todos os usuários

        response.setHeader('content-Type', 'application/json')
        response.end(JSON.stringify(users))
    
    }else if(url.startsWith('/users/') && method === 'GET'){//Buscar único usuários
        const usersId = url.split('/')[2]
        const user = users.find((user)=> user.id == usersId)

        if(user){
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(user));
        }else{
            response.writeHead(404, {"Content-Type":"application/json"});
            response.end(JSON.stringify({message: "Usuário não encontrado"}));
        }

    }else if(url === '/users' && method == "POST"){//cadastrar um usuário
        let body = ''
        request.on('data' ,(chunk)=>{
            body += chunk.toString()
        })
        request.on('end', () =>{
            const newUser = JSON.parse(body)
            newUser.id = users.length + 1
            users.push(newUser)
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(newUser))
        })

    }else if(url.startsWith('/users/') && method === 'PUT'){//Atualizar um usuário 
        const usersId = url.split("/")[2]

        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on('end', ()=> {
            const uptadeUser = JSON.parse(body)
            const index = users.findIndex((user)=> user.id == usersId)
            if(index !== -1){//atualizar
                users[index] = {...users[index], uptadeUser}
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(users[index]))
            }else{//retornar erro
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "Erro ao tentar atualizar!"}))
            }
        })


    } else if (url.startsWith('/users/') && method === 'DELETE') { // Deletar um usuário
        const userId = url.split('/')[2];
        const index = users.findIndex((user) => user.id == userId);
    
        if (index !== -1) { // Usuário encontrado, então deletar
            users.splice(index, 1);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Usuário deletado com sucesso" }));
        } else { // Usuário não encontrado, retornar erro
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Usuário não encontrado" }));
        }
    } else { // Recurso não encontrado
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Recurso não encontrado" }));
    }
    
    })

server.listen(PORT, () => {
    console.log(`Servidor on PORT: ${PORT}`)
})