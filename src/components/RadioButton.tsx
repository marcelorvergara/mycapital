interface IRadioButtonProps {
  searchCard: (e: string, field: string) => {};
}

function RadioButton({ searchCard }: IRadioButtonProps) {
  return (
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
  );
}
export default RadioButton;
