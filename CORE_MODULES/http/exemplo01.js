const { createServer } = require('node:http')
const http = require('node:http')
const PORT = 3333 || 4444

const server = http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/plan'})
    response.write(`Olá, Mundo!`)
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})