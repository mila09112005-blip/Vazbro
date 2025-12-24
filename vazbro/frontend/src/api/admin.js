import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("admin/users/");
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("products/");
  return response.data;
};
