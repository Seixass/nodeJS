console.log(process.argv)

const args = process.argv.slice(2)

console.log(args)

const nome = args [0].split('=') //'nome=Victor'
console.log(nome)

const idade = args [1].split('=') //'age=17'
console.log(idade)
console.log(`O nome ${nome} e idade ${idade} anos`)