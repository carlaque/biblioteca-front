import "./App.css";
import Livros from "./components/Livros";
import LivroForm from "./components/LivroForm";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Gestão de Biblioteca</h1>
      <Link
        to={{ pathname: "/cadastrar"}}
        className="btn"
      >
        Cadastrar 
      </Link>
      <Livros />
      {/* <LivroForm/> */}
    </div>
  );
}

export default App;
