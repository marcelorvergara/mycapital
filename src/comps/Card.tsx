import { ICard } from "../api/client";

interface ICardProps {
  card: ICard;
}

function Card({ card }: ICardProps) {
  console.log(card);
  return (
    <div className="">
      <div className="flex flex-col justify-between p-6 rounded-lg shadow-lg bg-white max-w-sm h-56">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {card.nome}
        </h5>
        <p className="text-gray-700 text-base mb-4">{card.descricao}</p>
        <div className="flex gap-32 items-center justify-between">
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Adicionar
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
