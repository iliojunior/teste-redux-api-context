import React, { createContext, createFactory, memo, Component } from "react";

import * as R from "ramda";

const createStore = () => {
  const initial = {};
  const listeners = [];

  return {
    getInitial: () => initial,

    setInitial: (id, next) => {
      initial[id] = next;
      store.emit(id, next);
    },

    subscribe: listener => {
      listeners.push(listener);
    },

    unsubscribe: listener => {
      listeners.splice(listeners.indexOf(listener), 1);
    },

    emit: (id, next) => {
      for (const listener of listeners) {
        listener(id, next);
      }
    }
  };
};

const ctx = createContext({});
const store = createStore();

export class Provider extends Component {
  state = store.getInitial();

  componentDidMount() {
    store.subscribe(this.handleUpdate);
  }

  componentWillUnmount() {
    store.unsubscribe(this.handleUpdate);
  }

  shouldComponentUpdate(_, nextState) {
    return !R.equals(this.state, nextState);
  }

  render() {
    return (
      <ctx.Provider value={this.state}>{this.props.children}</ctx.Provider>
    );
  }

  handleUpdate = (id, next) => {
    this.setState(prevState => ({
      [id]: typeof next === "function" ? next(prevState[id]) : next
    }));
  };
}

let id = 0;
const getId = () => R.identity(id++);

const getContext = R.when(R.has("get"), R.prop("get"));
const getState = R.ifElse(
  R.is(String),
  val => R.assoc(val, R.__, {}),
  R.when(R.isNil, () => R.identity)
);

export function create(initial = {}) {
  const id = getId();

  store.setInitial(id, initial);

  return {
    get: fn => <ctx.Consumer>{state => fn(state[id])}</ctx.Consumer>,

    set: next => store.emit(id, next),

    select: selector => fn => (
      <ctx.Consumer>
        {state => {
          const select = selector(state[id]);

          return fn(select);
        }}
      </ctx.Consumer>
    ),

    subscribe: fn => {
      const sub = (selectedId, next) => {
        if (selectedId === id) {
          fn(next);
        }
      };

      store.subscribe(sub);

      return () => store.unsubscribe(sub);
    },

    withContext: propMap => {
      const parseState = getState(propMap);

      return Component => {
        const factory = createFactory(Component);

        return memo(props => (
          <ctx.Consumer>
            {state => factory({ ...parseState(state[id]), ...props })}
          </ctx.Consumer>
        ));
      };
    }
  };
}

export const withContext = (ctx, propMap) => {
  if (!ctx) {
    console.error("[withContext]: Context is required");
  }

  const context = getContext(ctx);
  const parseState = getState(propMap);

  return Component => {
    const factory = createFactory(Component);

    return memo(props =>
      context(state => factory({ ...parseState(state), ...props }))
    );
  };
};
