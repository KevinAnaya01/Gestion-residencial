import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import type { auth } from "../interface/auth";
import { loginUser } from "../../../api/axios/auth.api";

interface LoginErrors {
  email?: string;
  password?: string;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<auth | null>(null);
  const [formData, setFormData] = useState<auth>({
    email: "",
    contraseña: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.contraseña) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.contraseña.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await loginUser(formData.email, formData.contraseña);
      console.log(response);

      const user = (response as { user: any }).user;

      if (user) {
        Cookies.set("auth_token", JSON.stringify(user), {
          expires: 1, // 1 día
          secure: true,
          sameSite: "strict",
        });

        navigate("/inicio");
        return user;
      } else {
        toast.error("Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error) {
      toast.error(error.message || "Error de autenticación. Intenta de nuevo.");
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return {
    auth,
    setAuth,
    setFormData,
    formData,
    showPassword,
    isLoading,
    errors,
    handleInputChange,
    handleSubmit,
    handleKeyPress,
    setShowPassword,
  };
};
