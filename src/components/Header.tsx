// src/components/Header.tsx
import React from "react";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface HeaderProps {
  titulo: string; // 👈 Permite personalizar el nombre del módulo (por ejemplo: "Gestión Residencial" o "Gestión de Apartamentos")
}

export const Header: React.FC<HeaderProps> = ({ titulo }) => {
  const navigate = useNavigate();

  const usuario = Cookies.get("auth_token") || "{}";
  const jsonUsuario = JSON.parse(usuario);
  const Nombre = jsonUsuario?.correo || "Usuario";
  const rol = "Administrador"; // <- traerlo del backend más adelante

  // 🔹 Confirmación antes de cerrar sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y deberás iniciar nuevamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // Azul Tailwind (azul principal del sistema)
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      background: "#f9fafb", // Color suave de fondo
      color: "#111827", // Texto gris oscuro
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("auth_token");
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has salido del sistema correctamente.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{titulo}</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600">
          Bienvenido, <span className="font-semibold">{Nombre}</span> ({rol})
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Salir</span>
        </button>
      </div>
    </header>
  );
};
