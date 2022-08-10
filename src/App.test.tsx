import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import Card from "./comps/Card";
import { getCardsApi, ICard, searchCardApi } from "./api/client";

describe("App test", () => {
  it("renders App component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Você está pronto/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Card test", () => {
  const card: ICard = {
    id: "1",
    nome: "teste",
    descricao: "teste teste",
    ataque: 5,
    defesa: 5,
    classe: "teste",
    tipo: "teste",
  };
  it("renders Card component", () => {
    render(
      <MemoryRouter>
        <Card card={card} />
      </MemoryRouter>
    );
  });
});

describe("Test functions", () => {
  it("should test searchCardApi", async () => {
    const response = await searchCardApi("as");
    expect(response).toBeDefined();
  });

  it("should test getCardsApi", async () => {
    const response = await getCardsApi();
    expect(response).toBeDefined();
  });
});
