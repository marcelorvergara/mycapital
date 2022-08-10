import React, { useState } from "react";
import { ICard, searchCardApi } from "../api/client";
import Card from "../components/Card";
import Deck from "../components/Deck";
import Select from "react-select";

const options = [
  { value: "mago", label: "Mago" },
  { value: "paladino", label: "Paladino" },
  { value: "caçador", label: "Caçador" },
  { value: "druida", label: "Druida" },
  { value: "qualquer", label: "Qualquer" },
];

function Manage() {
  const [alert, setAlert] = useState("");

  // listagem de cards mostrados pela busca
  const [cards, setCards] = useState<ICard[]>([]);

  async function searchCard(e: string, field: string) {
    const response = await searchCardApi(e, field);
    setCards(response);
  }

  // administração do deck de cards
  const [cardsList, setCardsList] = useState<ICard[]>(() => {
    const cards = localStorage.getItem("cards") as string;
    if (cards === null || cards === "null") return [];
    try {
      return JSON.parse(cards);
    } catch {}

    return cards;
  });

  function addCardToList(e: React.MouseEvent, card: ICard) {
    const cardsListCopy = cardsList.slice();
    setAlert("");
    // testar se há cartas duplicadas
    const findResult = cardsListCopy.filter((f) => f.id === card.id);
    // número máximo de cartas = 30
    if (cardsListCopy.length >= 30) {
      setAlert("Número máximo de cartas atingido");
    } else if (findResult.length > 1) {
      // aqui pelo menos uma carta já está no deck
      setAlert("Só são permitidas 2 cartas iguais");
    } else {
      cardsListCopy.push(card);
      localStorage.setItem("cards", JSON.stringify(cardsListCopy));
      setCardsList(cardsListCopy);
    }
  }

  async function removeCardFromList(e: React.MouseEvent, cardId: string) {
    setAlert("");
    const cardsListCopy = cardsList.slice();
    //const newCardsList = cardsListCopy.filter((item) => item.id !== cardId);
    cardsListCopy.splice(
      cardsListCopy.findIndex((i) => i.id === cardId),
      1
    );
    localStorage.setItem("cards", JSON.stringify(cardsListCopy));
    setCardsList(cardsListCopy);
  }

  return (
    <div className="mx-24">
      <div className="flex flex-wrap gap-3 flex-row mt-12 bg-slate-400 p-12">
        {cardsList &&
          cardsList.map((item: ICard, idx: React.Key | null | undefined) => (
            <Deck
              key={idx}
              card={item}
              removeCardFromList={(
                e: React.MouseEvent<Element, MouseEvent>,
                cardId: string
              ) => removeCardFromList(e, cardId)}
            />
          ))}
      </div>
      {alert && (
        <div className="w-full text-white bg-red-500 px-2.5 py-2">{alert}</div>
      )}
      <div className="flex mt-6">
        <div className="flex justify-center gap-6">
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearchId"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por Id:
            </label>
            <input
              type="search"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearchId"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "id")
              }
            />
          </div>
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearchNome"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por nome:
            </label>
            <input
              type="search"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearchName"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "nome")
              }
            />
          </div>
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearchClasse"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por classe:
            </label>
            <Select
              placeholder="Selecione a classe"
              options={options}
              onChange={(event) => searchCard(event?.value || "", "classe")}
            />
          </div>
          <div className="ml-6 mb-3 xl:w-70">
            <label
              htmlFor="cardSearchTipo"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por tipo:
            </label>
            <div
              className="flex gap-2 items-center justify-between"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "tipo")
              }>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="ambos"
                  value=""
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="ambos">
                  Magia ou Criatura
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="magia"
                  value="magia"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="magia">
                  Magia
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="criatura"
                  value="criatura"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="criatura">
                  Criatura
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-6">
        {cards &&
          cards.map((card: ICard) => (
            <Card
              key={card.id}
              card={card}
              addCardToList={(
                e: React.MouseEvent<Element, MouseEvent>,
                card: ICard
              ) => addCardToList(e, card)}
            />
          ))}
      </div>
    </div>
  );
}

export default Manage;
