import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Livros extends React.Component {
  state = {
    livro: {
      id: "",
      isbn: "",
      titulo: "",
      autor: "",
      genero: "",
    },
    lista: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/livros`, {
        responseType: "json",
      })
      .then((response) => {
        const nState = { ...this.state };
        nState.lista = response.data;
        this.setState(nState);
      });
  }

  editar() {}

  excluir(livro) {
    const apiUrl = `http://localhost:8080/livros/${livro.isbn}`;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.alunoAtual),
    }).then((response) => {
      console.log(response.body);
      alert(
        "O livro de \nisbn: " +
          livro.isbn +
          "\ntitulo: " +
          livro.titulo +
          "\nfoi excluido com sucesso."
      );
      this.componentDidMount();
    });
  }

  render() {
    const lista = this.state.lista;
    const listaDisplay = [];
    const camposTabela = [];
    for (let i = 0; i < lista.length; i++) {
      listaDisplay.push(
        <tr key={lista[i].isbn}>
          <td>{lista[i].id}</td>
          <td>{lista[i].isbn}</td>
          <td>{lista[i].titulo}</td>
          <td>{lista[i].autor}</td>
          <td>{lista[i].genero}</td>
          <td>
            <div id="td-buttons">
              <Link
                to={{ pathname: "/cadastrar/:isbn", isbn: lista[i].isbn }}
                className="link"
              >
                Editar
              </Link>
              <button
                id="btn-excluir"
                onClick={() => {
                  this.excluir(lista[i]);
                }}
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      );
    }

    if (lista[0] !== undefined) {
      Object.keys(lista[0]).forEach((campo) => {
        camposTabela.push(<th>{campo.toUpperCase()}</th>);
      });
      camposTabela.push(<th> </th>);
    }

    return (
      <div>
        <h2>Livros</h2>
        <table className="table table-striped">
          <thead>
            <tr>{camposTabela}</tr>
          </thead>
          <tbody>{listaDisplay}</tbody>
        </table>
      </div>
    );
  }
}

export default Livros;
