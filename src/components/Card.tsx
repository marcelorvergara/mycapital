import React from "react";
import { ICard } from "../api/client";

interface ICardProps {
  card: ICard;
  addCardToList: (e: React.MouseEvent, card: ICard) => void;
}

function Card({ card, addCardToList }: ICardProps) {
  return (
    <div className="w-80">
      <div className="flex flex-col justify-between p-6 rounded-lg shadow-lg bg-white max-w-sm h-72">
        <h5 className="text-gray-50 text-xl leading-tight font-medium mb-2 bg-slate-600 rounded-sm px-2.5 py-2">
          {card.nome}
        </h5>
        <p className="text-gray-700 text-base mb-1">{card.descricao}</p>
        <div className="grid grid-cols-2 mb-2 bg-slate-200 p-2 rounded-sm">
          <div>Ataque: {card.ataque}</div>
          <div>Defesa: {card.defesa}</div>
          <div>Tipo: {card.tipo}</div>
          <div>Classe: {card.classe}</div>
        </div>
        <div className="flex gap-32 items-center justify-end">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e: React.MouseEvent) => addCardToList(e, card)}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
