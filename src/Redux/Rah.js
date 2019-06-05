import React from "react";

import * as R from "ramda";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";

import "../App.css";
import logo from "../logo.svg";
import Api from "../Api";
import { setMe } from "./actions";

const Rah = ({ me }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Redux -{me.valor}- <code>src/App.js</code> and save to reload.
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
const bilu = (dispatcher, count = 0) => {
  idTimeout = meuTime(() => {
    dispatcher({ valor: count });
    Api();
    console.log("passous RAH", count);
    bilu(dispatcher, ++count);
  });
};

const mapStateToProps = state => ({
  me: state.me
});

const mapDispatchToProps = dispatch => ({
  dispatchMe: R.compose(
    dispatch,
    setMe
  )
});

const enhance = compose(
  withState("teste1", "setTeste1", 1),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
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
    chama: ({ dispatchMe }) => () => bilu(dispatchMe)
  }),
  lifecycle({
    componentDidMount() {
      console.log("render Redux");
      this.props.chama();
    },
    componentWillUnmount() {
      clearTimeout(idTimeout);
    }
  })
);

export default enhance(Rah);
