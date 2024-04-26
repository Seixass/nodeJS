//Modulo externo
const minimist = require("minimist");


//modulo interno
//chamando o modulo de soma
const soma = require('./modulosoma').soma

const args = minimist(process.argv.splice(2))
const a = args ["numero1"]
const b = args ["numero2"]
//node index.js --numero1=10 --numero2=20
console.log(`A soma de ${a} + ${b} = ${soma(a,b)}`)


