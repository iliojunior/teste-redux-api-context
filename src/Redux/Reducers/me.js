const initialMe = {
  valor: 123
};

export default (state = initialMe, action) => {
  switch (action.type) {
    case "SET_ME":
      return {
        ...state,
        valor: action.valor
      };
    default:
      return state;
  }
};
