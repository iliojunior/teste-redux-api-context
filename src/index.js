import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import { withStateHandlers } from "recompose";

import ReduxApp from "./Redux";
import reduxStore from "./Redux/store";

import ApiBiruleibe from "./ApiContext/Biruleibe";
import { Provider as ApiProvider } from "./ApiContext/context";

const AppComponent = ({ tipo, setTipo }) => (
  <div>
    <button onClick={setTipo}>Trocar</button>

    {tipo && (
      <Provider store={reduxStore}>
        <ReduxApp />
      </Provider>
    )}

    {!tipo && (
      <ApiProvider>
        <ApiBiruleibe />
      </ApiProvider>
    )}
  </div>
);

const enhance = withStateHandlers(
  () => ({
    tipo: false
  }),
  {
    setTipo: ({ tipo }) => () => ({ tipo: !tipo })
  }
);

const App = enhance(AppComponent);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
