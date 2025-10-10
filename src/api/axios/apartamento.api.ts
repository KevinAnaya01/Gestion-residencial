import type { apartamento } from "../../apartamentos/apartamento";
import api from "./axiosConfig";

export const obtenerApartamentos = async () => {
  try {
    const response = await api.get("/apartamentos/get");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const registrarApartamento = async (data: apartamento) => {
  try {
    const response = await api.post("/apartamentos/post", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const actualizarApartamento = async (id: number, data: apartamento) => {
  try {
    const response = await api.put(`/apartamentos/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
export const eliminarApartamento = async (id: number) => {
  try {
    const response = await api.delete(`/apartamentos/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
