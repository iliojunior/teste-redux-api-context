import { create } from "apisauce";

const api = create({
  baseURL: "https://59de9cf3b11b290012f17b38.mockapi.io/api/"
});

const call = () => api.get("todos");

export default call;
