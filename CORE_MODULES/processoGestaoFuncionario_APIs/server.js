import http from 'node:http';
import fs from 'node:fs';

const PORT = 3333;
const EMPLOYEES_FILE_PATH = './employees.json';

let employees = loadEmployees();

function loadEmployees() {
    try {
        const data = fs.readFileSync(EMPLOYEES_FILE_PATH);
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao carregar os funcionários:', error);
        return [];
    }
}

function saveEmployees() {
    try {
        const data = JSON.stringify(employees, null, 2);
        fs.writeFileSync(EMPLOYEES_FILE_PATH, data);
    } catch (error) {
        console.error('Erro ao salvar os funcionários:', error);
    }
}

const server = http.createServer((request, response) => {
    const { url, method } = request;
    console.log('URL:', url);

    if (url === "/empregados" && method === "GET") {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(employees));
    } else if (url.startsWith("/empregados/") && method === "GET") {
        const employeeId = parseInt(url.split('/')[2]);
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(employee));
        } else {
            response.writeHead(404, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Funcionário não encontrado"}));
        }
    } else if (url === "/empregados" && method === "POST") {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const newEmployee = JSON.parse(body);
            

            const id = Date.now(); 
            newEmployee.id = id;
            employees.push(newEmployee);
            saveEmployees();

            response.writeHead(201, {"Content-Type": "application/json"});
            response.end(JSON.stringify(newEmployee));
        });
    } else if (url.startsWith("/empregados/") && method === "PUT") {
        const employeeId = parseInt(url.split('/')[2]);
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const updateData = JSON.parse(body);
            const index = employees.findIndex(emp => emp.id === employeeId);
            if (index !== -1) {
                employees[index] = {...employees[index], ...updateData};
                saveEmployees();
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(employees[index]));
            } else {
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "Funcionário não encontrado"}));
            }
        });
    } else if (url.startsWith("/empregados/") && method === "DELETE") {
        const employeeId = parseInt(url.split('/')[2]);
        const index = employees.findIndex(emp => emp.id === employeeId);
        if (index !== -1) {
            employees.splice(index, 1);
            saveEmployees();
            response.writeHead(204);
            response.end();
        } else {
            response.writeHead(404, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Funcionário não encontrado"}));
        }
    } else if (url === "/empregados/count" && method === "GET") {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ count: employees.length }));
    } else if (url === "/empregados/porCargo" && method === "GET") {
        const cargo = request.url.split('/')[2];
        const employeesByCargo = employees.filter(emp => emp.cargo === cargo);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(employeesByCargo));
    } else if (url === "/empregados/porHabilidade" && method === "GET") {
        const habilidade = request.url.split('/')[2];
        const employeesByHabilidade = employees.filter(emp => emp.habilidades.includes(habilidade));
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(employeesByHabilidade));
    } else if (url === "/empregados/porFaixaSalarial" && method === "GET") {
        const { min, max } = request.url.split('?')[1].split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = parseFloat(value);
            return acc;
        }, {});
        const employeesBySalaryRange = employees.filter(emp => emp.salario >= min && emp.salario <= max);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(employeesBySalaryRange));
    } else {
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({codigo: 404, message: "Página não encontrada"}));
    }
});

server.listen(PORT, () => {
    console.log('Servidor está on ' + PORT);
});