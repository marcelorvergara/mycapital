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
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "mycapital" } });

    expect(screen.queryByText("mycapitalll")).not.toBeInTheDocument();
  });

  it("should test card rendering inside Manage component", () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    return screen.findAllByRole("button", { name: /adicionar/i });
  });

  it("should test add card", async () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    const btn = await screen.findAllByRole("button", { name: /adicionar/i });
    fireEvent.click(btn[0]);
  });

  it("should test remove card", async () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    const btnAdd = await screen.findAllByRole("button", { name: /adicionar/i });
    fireEvent.click(btnAdd[0]);

    const btnRem = await screen.findAllByRole("button", { name: /remover/i });
    fireEvent.click(btnRem[0]);
  });

  it("should test card limit of same card", async () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    const btnAdd = await screen.findAllByRole("button", { name: /adicionar/i });
    fireEvent.click(btnAdd[0]);
    fireEvent.click(btnAdd[0]);
    fireEvent.click(btnAdd[0]);
    fireEvent.click(btnAdd[0]);

    const alert = await screen.findByTestId("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should test card limit of 30", async () => {
    render(<Manage />);
    const filter = screen.getByLabelText(/Consulta de carta por Id:/i);
    fireEvent.change(filter, { target: { value: "a" } });

    const btnAdd = await screen.findAllByRole("button", { name: /adicionar/i });
    for (let i = 0; i < 31; i++) {
      fireEvent.click(btnAdd[i]);
    }

    const alert = await screen.findByTestId("alert");
    expect(alert).toBeInTheDocument();
  });
});

describe("Card test", () => {
  it("renders Card component", () => {
    render(
      <MemoryRouter>
        <Card card={card} addCardToList={() => []} />
      </MemoryRouter>
    );
  });
});

describe("Test functions", () => {
  it("should test searchCardApi", async () => {
    const response = await searchCardApi("as", "nome");
    expect(response).toBeDefined();
  });

  it("should test getCardsApi", async () => {
    const response = await getCardsApi();
    expect(response).toBeDefined();
  });
});

describe("Test helpers", () => {
  it("should test local storage", async () => {});
});
