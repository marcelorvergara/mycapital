import React, { useEffect, useState } from "react";
import { ICard, searchCardApi } from "../api/client";
import Card from "../components/Card";
import Deck from "../components/Deck";

function Manage() {
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
    cardsListCopy.push(card);
    localStorage.setItem("cards", JSON.stringify(cardsListCopy));
    setCardsList(cardsListCopy);
  }

  async function removeCardFromList(e: React.MouseEvent, cardId: string) {
    const cardsListCopy = cardsList.slice();
    const newCardsList = cardsListCopy.filter((item) => item.id !== cardId);
    localStorage.setItem("cards", JSON.stringify(newCardsList));
    setCardsList(newCardsList);
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
      <div className="flex mt-6">
        <div className="flex justify-center gap-2">
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearch"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por Id:
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearch"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "id")
              }
            />
          </div>
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearch"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por nome:
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearch"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "nome")
              }
            />
          </div>
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearch"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por classe:
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearch"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "classe")
              }
            />
          </div>
          <div className="mb-3 xl:w-70">
            <label
              htmlFor="cardSearch"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta por tipo:
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearch"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value, "tipo")
              }
            />
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
