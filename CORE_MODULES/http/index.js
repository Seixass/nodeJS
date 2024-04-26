//O módulo HTTP é um dos módulos principais do node.js e fornece funcionaçidades para criar servidores HTTP e fazer requisições HTTP.

const http = require ('node:http')

const server = http.createServer((request, response)=>{
    response.write('Olá, meu primeiro servidor HTPP !')
    response.end()
})

server.listen(3333, ()=>{
    console.log('Servidor on PORT: 3333')
})