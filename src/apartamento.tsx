import React, { useState } from "react";
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApartamento } from "./apartamentos/use-apartamento";
import type { apartamento } from "./apartamentos/apartamento";
import { FormularioApartamento } from "./apartamentos/Formulario";
import { Header } from "./Header";

export const Apartamento: React.FC = () => {
  const {
    apartamentos,
    createApartamento,
    updateApartamento,
    deleteApartamento,
    loading,
  } = useApartamento();

  const navigate = useNavigate();

  // Estado para controlar formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [apartamentoEdit, setApartamentoEdit] = useState<apartamento | null>(
    null
  );

  // Estado local para los inputs del formulario
  const [formData, setFormData] = useState<apartamento>({
    id: 0,
    torre: "",
    bloque: "",
    piso: "",
    tipoapartamento: "",
  });

  // 🔹 Manejar cambios de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (apartamentoEdit) {
      await updateApartamento(apartamentoEdit.id, formData);
    } else {
      await createApartamento(formData);
    }

    setMostrarFormulario(false);
    setApartamentoEdit(null);
    setFormData({ id: 0, torre: "", bloque: "", piso: "", tipoapartamento: "" });
  };

  // 🔹 Preparar edición
  const handleEdit = (a: apartamento) => {
    setApartamentoEdit(a);
    setFormData(a);
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* ✅ Header reutilizable */}
      <Header titulo="Gestión de Apartamentos" />

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        {/* Botón para volver y registrar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/inicio")}
            className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Inicio
          </button>

          <button
            onClick={() => {
              setMostrarFormulario(true);
              setApartamentoEdit(null);
              setFormData({
                id: 0,
                torre: "",
                bloque: "",
                piso: "",
                tipoapartamento: "",
              });
            }}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" /> Registrar Apartamento
          </button>
        </div>

        {/* Si el formulario está visible */}
        {mostrarFormulario ? (
          <FormularioApartamento
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            isEdit={!!apartamentoEdit}
          />
        ) : (
          // Tabla de apartamentos
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
                    <td className="py-3 px-4">{a.tipoapartamento}</td>
                    <td className="py-3 px-4 flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteApartamento(a.id)}
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
        )}
      </main>
    </div>
  );
};
