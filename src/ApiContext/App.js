import React from "react";

import { compose, withState, lifecycle, withHandlers } from "recompose";

import "../App.css";
import logo from "../logo.svg";
import { withContext } from "./context";
import store, { setMe } from "./store";
import Api from "../Api";

const App = ({ me }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        ApiContext -{me.me}- <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

let idTimeout;
const meuTime = fn => setTimeout(fn, 3000);
const chama = (count = 0) => {
  idTimeout = meuTime(() => {
    setMe({ me: count });
    console.log("passous APP", count);
    Api();
    setMe({ me: count });
    chama(++count);
  });
};
const enhance = compose(
  withState("teste1", "setTeste1", 1),
  withContext(store),
  withContext(store),
  withState("teste2", "setTeste2", 2),
  withState("teste3", "setTeste3", 3),
  withState("teste4", "setTeste4", 4),
  withState("teste5", "setTeste5", 5),
  withState("teste6", "setTeste6", 6),
  withState("teste7", "setTeste7", 7),
  withState("teste8", "setTeste8", 8),
  withState("teste9", "setTeste9", 9),
  withState("teste10", "setTeste10", 10),
  withHandlers({
    testes: () => () => {
      console.log("testes");
    }
  }),
  lifecycle({
    componentDidMount() {
      console.log("render API");
      chama();
    },
    componentWillUnmount() {
      clearTimeout(idTimeout);
    }
  })
);

export default enhance(App);
