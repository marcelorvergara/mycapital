import React, { useRef, useState } from "react";
import { ICard, searchCardApi } from "../api/client";
import Card from "../components/Card";
import Deck from "../components/Deck";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import RadioButton from "../components/RadioButton";
import InputSearch from "../components/InputSearch";
import home from "../img/home.png";
import { Link } from "react-router-dom";

const options = [
  { value: "mago", label: "Mago" },
  { value: "paladino", label: "Paladino" },
  { value: "caçador", label: "Caçador" },
  { value: "druida", label: "Druida" },
  { value: "qualquer", label: "Qualquer" },
];

function Manage() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldId, setFieldId] = useState("");
  // listagem de cards mostrados pela busca
  const [cards, setCards] = useState<ICard[]>([]);

  async function searchCard(e: string, field: string) {
    setLoading(true);
    const response = await searchCardApi(e, field);
    if (cards.length > 0 && fieldId !== field) {
      const ids = new Set(cards.map((d) => d.id));
      setCards([...new Set([...response.filter((f) => ids.has(f.id))])]);
    } else {
      setCards(response);
    }
    setFieldId(field);
    setLoading(false);
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

  // adição de cards no deck
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

  // remoção de cards do deck
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

  // limpando os filtrso - melhorar
  const refId = useRef<HTMLInputElement>(null);
  const refNome = useRef<HTMLInputElement>(null);
  function limpaFiltros() {
    console.log("TESTE");
    if (refId.current) {
      refId.current.value = "";
    }
    if (refNome.current) {
      refNome.current.value = "";
    }
  }

  return (
    <div className="mx-24">
      <div className="cursor-pointer mt-4 ">
        <Link to="/">
          <img src={home} alt="Home" />
        </Link>
      </div>
      {/* área para apresentação das cartas (deck) */}
      <div className="flex flex-wrap gap-3 flex-row mt-4 bg-slate-400 p-6 rounded-sm">
        {cardsList.length > 0 ? (
          cardsList.map((item: ICard, idx: React.Key | null | undefined) => (
            <Deck
              key={idx}
              card={item}
              removeCardFromList={(
                e: React.MouseEvent<Element, MouseEvent>,
                cardId: string
              ) => removeCardFromList(e, cardId)}
            />
          ))
        ) : (
          <div className="text-gray-300 text-xl">Nenhuma carta cadastrada</div>
        )}
      </div>
      {/* área para apresentar alerta - caso ocorra a necessidade */}
      {alert && (
        <div
          data-testid="alert"
          className="w-full text-white bg-red-500 px-2.5 py-2">
          {alert}
        </div>
      )}
      {/* área para os inputs de pesquisa das cartas */}
      <div className="flex mt-6">
        <div className="flex justify-center gap-6">
          <InputSearch field={"id"} searchCard={searchCard} reference={refId} />
          <InputSearch
            field={"nome"}
            searchCard={searchCard}
            reference={refNome}
          />
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
            <RadioButton searchCard={searchCard} />
          </div>
          <div className="mt-2 ml-12">
            <button
              type="button"
              className="h-12 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={limpaFiltros}>
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
      {/* área para apresentar os restultados da pesquisa e o spinner (loading) */}
      <div className="form-label inline-block mb-2 text-gray-700">
        Resultados encontrados: {cards && cards.length}
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-6">
        {loading ? (
          <div className="flex justify-center m-5 w-full">
            <ClipLoader size={150} />
          </div>
        ) : (
          cards &&
          cards.map((card: ICard) => (
            <Card
              key={card.id}
              card={card}
              addCardToList={(
                e: React.MouseEvent<Element, MouseEvent>,
                card: ICard
              ) => addCardToList(e, card)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Manage;
