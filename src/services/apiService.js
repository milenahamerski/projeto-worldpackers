// Importar a chave de API do arquivo de configuração
const {
  API_KEY,
} = require("/home/milena/Documentos/seashellter/projeto-worldpackers/src/assets/main/config.js");
const axios = require("axios");

async function getPublicData() {
  try {
    const response = await axios.get(
      "https://world-dive-centres-api.p.rapidapi.com/api/divecentres?country=phuket",
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "world-dive-centres-api.p.rapidapi.com",
        },
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      const firstResponse = response.data.data[0];
      console.log(firstResponse);
      return firstResponse;
    } else {
      console.error("Resposta da API pública está vazia");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter dados da API pública:", error);
    return null;
  }
}

async function combineData() {
  const publicData = await getPublicData();
  const fakeData = require("../services/db.json");

  if (!publicData || !fakeData) {
    console.error("Dados inválidos");
    return null;
  }

  // Combinar os dados com base no ID
  const combinedData = fakeData.map((item) => {
    const publicItem = publicData.find(
      (publicItem) => publicItem.id === item.id
    );
    return {
      ...item,
      publicData: publicItem,
    };
  });

  return combinedData;
}

// Exemplo de uso
combineData().then((combinedData) => {
  if (combinedData) {
    console.log(combinedData);
  }
});
