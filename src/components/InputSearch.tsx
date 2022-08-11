import { RefObject } from "react";

interface IInputSearchProps {
  field: string;
  searchCard: (e: string, field: string) => {};
  reference: RefObject<HTMLInputElement>;
}

function InputSearch({ field, searchCard, reference }: IInputSearchProps) {
  return (
    <div className="mb-3 xl:w-70">
      <label
        htmlFor="cardSearchId"
        className="form-label inline-block mb-2 text-gray-700">
        Consulta de carta por {field}:
      </label>
      <input
        ref={reference}
        type="search"
        autoComplete="off"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none      "
        id="cardSearchId"
        placeholder="Procure por cartas aqui"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          searchCard(e.target.value, field)
        }
      />
    </div>
  );
}

export default InputSearch;
