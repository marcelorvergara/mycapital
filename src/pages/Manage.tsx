import React, { useState } from "react";
import { ICard, searchCardApi } from "../api/client";
import Card from "../components/Card";
import Deck from "../components/Deck";

function Manage() {
  const [cards, setCards] = useState<ICard[]>([]);

  async function searchCard(e: string) {
    const response = await searchCardApi(e);
    setCards(response);
  }

  return (
    <div className="mx-24">
      <div className="mt-12">
        <Deck />
      </div>
      <div className="flex mt-6">
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="cardSearch"
              className="form-label inline-block mb-2 text-gray-700">
              Consulta de carta:
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
              id="cardSearch"
              placeholder="Procure por cartas aqui"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchCard(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-6">
        {cards &&
          cards.map((card: ICard) => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );
}

export default Manage;
