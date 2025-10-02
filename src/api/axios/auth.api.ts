import api from "./axiosConfig";

export const loginUser = async (email: string, contraseña: string) => {
  try {
    const response = await api.post("/auth/login", { email, contraseña });
    return response.data;
  } catch (error) {
    console.error("Error de login:", error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message);
    }
    throw error;
  }
};
