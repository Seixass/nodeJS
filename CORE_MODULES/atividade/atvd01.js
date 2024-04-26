const http = require('node:http')
const PORT = 0880

const server = http.createServer((request, response)=>{
    if(request.url === '/'){
        response.writeHead(200, {"Content-Type":"text/html"})
        response.write("<meta charset=utf8>")
        response.write('<h1> Home Page </h1>')
        response.write('<h1> Bem vindo a página inicial </h1>')
        response.end()
    }else if(request.url === '/sobre'){
        response.writeHead(200, {"Content-Type":"text/html"})
        response.write("<meta charset=utf8>")
        response.write('<h1> Page About </h1>')
        response.write('<h1> Bem vindo a página sobre </h1>')
        response.end()
    }else{
        response.writeHead(404, {"Content-Type":"text/html"})
        response.write('<h1> Page not found </h1>')
        response.end()
    }
});

server.listen(PORT, ()=> {
    console.log(`Servidor on ${PORT}`)
})