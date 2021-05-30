import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LivroForm from "./components/LivroForm";

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/cadastrar" component={LivroForm} />
      <Route path="/cadastrar/:isbn" component={LivroForm} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
