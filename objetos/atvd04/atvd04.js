// Correção do Professor

const data = require('../onibus.json')

const onibusPorStatus = (status) =>{

    const onibus = data.onibus.filter((onibus) => onibus.status === status)
    return onibus.length != 0 ? {onibus}:{message: 'Ônibus não encontrado'}

}
const statusOnibus = 'em operação'
const situacaoOnibus = onibusPorStatus(statusOnibus)
console.log(situacaoOnibus)