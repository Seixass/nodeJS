const http = require('node:http')
const PORT = 3333

// request -> url
const server = http.createServer((request, response)=>{
 if(request.url === '/'){
    response.writeHead(200, {'Content-Type': 'text/plan'})
    response.end('Página Inicial')
 }else if(request.url === '/sobre'){
    response.writeHead(200, {'content-Type': 'text/plan'})
    response.end('Página Sobre')
 }else{
    response.writeHead(404, {'Content-Type': 'text/plan'})
    response.end('Página não encontrada')
 }
})

server.listen(PORT, () =>{
    console.log('Servidor on PORT'+PORT)
})
