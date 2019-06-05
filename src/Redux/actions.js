export const setMe = me => ({
  type: "SET_ME",
  ...me
});

export const setSession = session => ({
  type: "SET_SESSION",
  session
});
