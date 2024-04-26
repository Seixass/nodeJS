const data = {
    "empresa": "Viação Rápida",
    "linhas": [
      {
        "id": 1,
        "nome": "Expresso Centro",
        "horarios": [
          {
            "saida": "06:00",
            "chegada": "06:30"
          },
          {
            "saida": "07:00",
            "chegada": "07:30"
          }
        ]
      },
      {
        "id": 2,
        "nome": "Circular Praias",
        "horarios": [
          {
            "saida": "08:00",
            "chegada": "08:45"
          },
          {
            "saida": "09:00",
            "chegada": "09:45"
          }
        ]
      }
    ]
}; 

// Função para consultar horários por linha
function consultarHorarios() {
    const idLinha = parseInt(document.getElementById("linhaId").value);
    const horariosDiv = document.getElementById("horarios");
    const linha = data.linhas.find(l => l.id === idLinha);
    if (linha) {
        const horarios = linha.horarios;
        horariosDiv.innerHTML = "<h2>Horários da Linha " + idLinha + ":</h2>";
        horarios.forEach(horario => {
            horariosDiv.innerHTML += "<p>Saída: " + horario.saida + ", Chegada: " + horario.chegada + "</p>";
        });
    } else {
        horariosDiv.innerHTML = "Linha não encontrada.";
    }
}

