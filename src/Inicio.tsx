//
import React from "react";
import { Home, Users, UserCheck, ClipboardList, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Inicio: React.FC = () => {
  const navigate = useNavigate();

  // Aquí puedes obtener los datos reales desde el backend o el contexto
  const usuario = Cookies.get("auth_token") || "Usuario";
  const jsonUsuario = JSON.parse(usuario);
  const Nombre = jsonUsuario.correo;

  const rol = "Administrador"; // <- este dato deberías traerlo del backend al iniciar sesión

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión Residencial
        </h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            Bienvenido, <span className="font-semibold">{Nombre}</span> ({rol})
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Salir</span>
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Panel de Inicio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Apartamentos */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
            <Home className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">
              Gestión de Apartamentos
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Administra y consulta información de los apartamentos.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Entrar →
            </button>
          </div>

          {/* Card Residentes */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
            <Users className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">
              Gestión de Residentes
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Consulta y gestiona la información de los residentes.
            </p>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              Entrar →
            </button>
          </div>

          {/* Card Visitas */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
            <UserCheck className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">
              Control de Visitas
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Registra y valida las visitas en tiempo real.
            </p>
            <button className="text-green-600 hover:text-green-800 font-medium">
              Entrar →
            </button>
          </div>

          {/* Card Reportes */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
            <ClipboardList className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Reportes</h3>
            <p className="text-sm text-gray-500 mb-4">
              Genera reportes de visitas y residentes frecuentes.
            </p>
            <button className="text-purple-600 hover:text-purple-800 font-medium">
              Entrar →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
