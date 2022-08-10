import axiosModule from "axios";

export interface ICard {
  id: string;
  nome: string;
  descricao: string;
  ataque: number;
  defesa: number;
  tipo: string;
  classe: string;
}

const axios = axiosModule.create({
  baseURL: "http://localhost:3001",
});

async function getCardsApi() {
  const response = await axios.get("/allCards");
  return response.data;
}

async function searchCardApi(search: string): Promise<ICard[]> {
  const response = await axios.get(`/allCards?nome_like=${search}`);
  return response.data;
}

export { getCardsApi, searchCardApi };
