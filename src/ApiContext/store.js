import produce from "immer";
import { create } from "./context";

const store = create({
  me: { me: 123 },
  session: { session: 123, admin: true },
  contextParameters: { contextParameters: 123 }
});

export const getMe = store.select(state =>
  state.me ? state.me.principal || {} : {}
);
export const getToken = store.select(state => (state.me ? state.me.id : null));
export const getContext = store.select(state =>
  state.me ? state.me.context || {} : {}
);
export const getContextParameters = store.select(
  state => state.contextParameters || {}
);
export const getSession = store.select(state =>
  state.session ? state.session : {}
);

export const setMe = data => {
  sessionStorage.setItem("CONSIGNET__TOKEN", data ? data.id : null);

  store.set(
    produce(state => {
      state.me = data;
    })
  );
};

export const setMePrincipal = data =>
  store.set(
    produce(state => {
      state.me.principal = data;
    })
  );

export const setMeContext = data =>
  store.set(
    produce(state => {
      state.me.context = data;
    })
  );

export const setSession = data =>
  store.set(
    produce(state => {
      state.session = data;
    })
  );

export const setContextParameters = data =>
  store.set(
    produce(state => {
      state.contextParameters = data;
    })
  );

export default store;
