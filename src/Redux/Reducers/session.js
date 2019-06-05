const initialSession = {
  me: 123,
  admin: true
};

export default (state = initialSession, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        session: action.session,
        admin: action.admin
      };
    default:
      return state;
  }
};
