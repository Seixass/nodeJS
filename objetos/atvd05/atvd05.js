const data = require('../onibus.json')

const encontrarInfoPorId = (idOnibus) => {
    const onibus = data.onibus.find((onibus) => onibus.id == idOnibus);
    if (onibus) {
      console.log(onibus);
    } else {
      console.log({ message: "não foi encontrada um onibus com esse id" });
    }
  };
  
  const idOnibus = "A102";
  
  encontrarInfoPorId(idOnibus);

