import React from "react";
import axios from "axios";

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
        .get(`http://localhost:8080/livros/${this.state.isbn}`, {
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
    const apiUrl = `http://localhost:8080/livros`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.livro),
    }).then((response) => {
        console.log(response)
      this.componentDidMount();
    });
  }

  render() {
    return (
      <div>
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
        <button
          className="btn btn-primary"
          onClick={() => {
            this.salvar();
          }}
        >
            {/* todo: aqui mudar qunado tem isbnd e parametro para no caso de edicao mudar o textp */}
          Salvar
        </button>
      </div>
    );
  }
}

export default LivroForm;