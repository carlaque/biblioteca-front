import React from "react";
import axios from "axios";
import { withRouter } from "react-router";

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

class LivroForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: props.location.isbn,
      livro: {},
    };
  }

  state = {
    isbn: "",
    livro: {
      id: "",
      isbn: "",
      titulo: "",
      autor: "",
      genero: "",
    },
  };
  componentDidMount() {
    if (this.state.isbn !== undefined) {
      axios
        .get(`http://10.68.77.71:8080/books/${this.state.isbn}`, {
          responseType: "json",
        })
        .then((response) => {
          const nState = { ...this.state };
          //   nState.isbn = isbn;
          nState.livro = response.data;
          this.setState(nState);
        });
    }
  }

  atualizarTexto(campo, txt) {
    const novoState = { ...this.state };

    novoState.livro[campo] = txt;
    this.setState(novoState);
  }

  salvar() {
    const apiUrl = `http://10.68.77.71:8080/books`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.livro),
    }).then((response) => {
      console.log(response);
      this.componentDidMount();
      alert("livro + " + this.state.livro.titulo + " cadastrado com sucesso");
    });
  }

  editar() {
    const apiUrl = `http://10.68.77.71:8080/books/${this.state.livro.isbn}`;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.livro),
    }).then((response) => {
      console.log(response);
      this.componentDidMount();
      alert("livro + " + this.state.livro.titulo + " cadastrado com sucesso");
    });
  }

  render() {
    const button = [];
    if (this.state.isbn == undefined) {
      button.push(
        <button
          id="btn"
          onClick={() => {
            this.salvar();
            this.props.history.push("/");
          }}
        >
          Salvar
        </button>
      );
    } else {
      button.push(
        <button
          id="btn"
          onClick={() => {
            this.editar();
            this.props.history.push("/");
          }}
        >
          Editar
        </button>
      );
    }

    return (
      <div className="form-livro">
        <h2>Cadastro de Livro</h2>
        <LabelInput
          label="ISBN:"
          corFundo="#DDDD00"
          value={this.state.livro.isbn}
          atualizarTexto={(txt) => this.atualizarTexto("isbn", txt)}
        />
        <LabelInput
          label="TITULO:"
          corFundo="#DDDD00"
          value={this.state.livro.titulo}
          atualizarTexto={(txt) => this.atualizarTexto("titulo", txt)}
        />
        <LabelInput
          label="AUTOR:"
          corFundo="#DDDD00"
          value={this.state.livro.autor}
          atualizarTexto={(txt) => this.atualizarTexto("autor", txt)}
        />
        <LabelInput
          label="GENERO:"
          corFundo="#DDDD00"
          value={this.state.livro.genero}
          atualizarTexto={(txt) => this.atualizarTexto("genero", txt)}
        />
        {button}
      </div>
    );
  }
}

export default withRouter(LivroForm);
