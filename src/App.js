import "./App.css";
import Livros from "./components/Livros";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Gestão de Biblioteca</h1>
      <Link
        to={{ pathname: "/cadastrar"}}
        className="link" 
        id="btn-cadastro"
      >
        Cadastrar Livro
      </Link>
      <Livros />
    </div>
  );
}

export default App;
