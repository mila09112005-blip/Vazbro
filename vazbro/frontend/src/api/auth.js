import api from "./axios";

export const register = (username, email, password) => {
  return api.post("auth/register/", { username, email, password });
};

export const login = async (username, password) => {
  const response = await api.post("auth/login/", {
    username,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
