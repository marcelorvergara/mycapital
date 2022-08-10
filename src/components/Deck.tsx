import { ICard } from "../api/client";

interface IDeckProps {
  card: ICard;
  removeCardFromList: (e: React.MouseEvent, cardId: string) => void;
}

function Deck({ card, removeCardFromList }: IDeckProps) {
  return (
    <div className="w-72">
      <div className="flex flex-col justify-between p-6 rounded-sm shadow-lg bg-white h-72">
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
            className=" inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e: React.MouseEvent) => removeCardFromList(e, card.id)}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
