const { default: nodeTest } = require("node:test")

function a(){
    console.log('Executando a função a()')
}
function b(){
    console.log('Executando a função b()')
}
function c(){
    console.log('Executando a função c()')
    a()
    b()
}

a()
c()
b()


// JAVASCRIPT
// back - node
// front - react
// mobile - react native

