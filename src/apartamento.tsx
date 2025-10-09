import React, { useState } from "react";
import { LogOut, Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Apartamento {
  id: number;
  torre: string;
  bloque: string;
  piso: string;
  tipo: string;
}

export const Apartamento: React.FC = () => {
  const navigate = useNavigate();

  // Obtener usuario desde la cookie
  const usuario = Cookies.get("auth_token") || "{}";
  const jsonUsuario = JSON.parse(usuario);
  const Nombre = jsonUsuario?.correo || "Usuario";
  const rol = "Administrador";

  // Datos simulados (puedes reemplazarlos con datos del backend)
  const [apartamentos, setApartamentos] = useState<Apartamento[]>([
    { id: 1, torre: "A", bloque: "1", piso: "3", tipo: "Residencial" },
    { id: 2, torre: "B", bloque: "2", piso: "5", tipo: "Arrendado" },
  ]);

  // Funciones CRUD simuladas
  const registrarApartamento = () => {
    const nuevo: Apartamento = {
      id: Date.now(),
      torre: "Nuevo",
      bloque: "Bloque X",
      piso: "1",
      tipo: "Residencial",
    };
    setApartamentos([...apartamentos, nuevo]);
  };

  const editarApartamento = (id: number) => {
    alert(`Editar apartamento con ID: ${id}`);
  };

  const eliminarApartamento = (id: number) => {
    setApartamentos(apartamentos.filter((a) => a.id !== id));
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Apartamentos
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
        {/* Botón para volver */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/inicio")}
            className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Inicio
          </button>

          <button
            onClick={registrarApartamento}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" /> Registrar Apartamento
          </button>
        </div>

        {/* Tabla de apartamentos */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Torre</th>
                <th className="py-3 px-4 text-left">Bloque</th>
                <th className="py-3 px-4 text-left">Piso</th>
                <th className="py-3 px-4 text-left">Tipo</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {apartamentos.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{a.id}</td>
                  <td className="py-3 px-4">{a.torre}</td>
                  <td className="py-3 px-4">{a.bloque}</td>
                  <td className="py-3 px-4">{a.piso}</td>
                  <td className="py-3 px-4">{a.tipo}</td>
                  <td className="py-3 px-4 flex justify-center space-x-3">
                    <button
                      onClick={() => editarApartamento(a.id)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => eliminarApartamento(a.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {apartamentos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No hay apartamentos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
