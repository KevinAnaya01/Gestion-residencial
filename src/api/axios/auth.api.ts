import api from "./axiosConfig";

export const loginUser = async (email: string, contraseña: string) => {
  try {
    const response = await api.post("/auth/login", { email, contraseña });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
