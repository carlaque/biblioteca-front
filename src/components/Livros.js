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

    isbn: "",
    titulo: "",
    autor: "",
    genero: ""
  };

  componentDidMount() {
    this.carregaBooks();
  }

  carregaBooks() {
    axios
      .get(
        `http://10.68.77.71:8080/books`, 
        {
          params: {
            isbn: this.state.isbn,
            titulo: this.state.titulo,
            autor: this.state.autor,
            genero: this.state.genero
          }
        })
      .then((response) => {
        const nState = { ...this.state };
        nState.lista = response.data;
        this.setState(nState);
      });
  }

  editar() {}

  excluir(livro) {
    const apiUrl = `http://10.68.77.71:8080/books/${livro.isbn}`;
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
        <div>
          <h2>Pesquisa</h2>
          <label>ISBN:</label><br/>
          <input className="form-control" value={this.state.isbn} onChange={(txt) => this.setState({isbn: txt.target.value})}/><br/>
          <label>TITULO:</label><br/>
          <input className="form-control" value={this.state.titulo} onChange={(txt) => this.setState({titulo: txt.target.value})}/><br/>
          <label>AUTOR:</label><br/>
          <input className="form-control" value={this.state.autor} onChange={(txt) => this.setState({autor: txt.target.value})}/><br/>
          <label>GENERO:</label><br/>
          <input className="form-control" value={this.state.genero} onChange={(txt) => this.setState({genero: txt.target.value})}/><br/>
          <input type="button" value="CARREGA MAIS" onClick={this.carregaBooks.bind(this)} />
        </div>
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

function LabelInput(props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        type="TEXT"
        value={props.value}
        className="form-control"
        onChange={(e) => {
          if (props.atualizarTexto) {
            props.atualizarTexto(e.target.value);
          }
        }}
      />
    </div>
  );
}