import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import Card from "./components/Card";
import { getCardsApi, ICard, searchCardApi } from "./api/client";
import Manage from "./pages/Manage";

const card: ICard = {
  id: "1",
  nome: "teste",
  descricao: "teste teste",
  ataque: 5,
  defesa: 5,
  classe: "teste",
  tipo: "teste",
};

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

describe("Manage test", () => {
  it("renders Manage page", () => {
    render(<Manage />);
  });

  it("should test autocomplete", async () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta:/i);
    fireEvent.change(filter, { target: { value: "mycapital" } });

    expect(screen.queryByText("mycapitalll")).not.toBeInTheDocument();
  });

  it("should test card rendering inside Manage component", () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    return screen.findAllByRole("button", { name: /adicionar/i });
  });
});

describe("Card test", () => {
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
