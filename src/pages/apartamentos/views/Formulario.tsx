import React from "react";
import type { apartamento } from "./interface/apartamento";

interface FormularioApartamentoProps {
  formData: apartamento;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  isEdit?: boolean;
}

export const FormularioApartamento: React.FC<FormularioApartamentoProps> = ({
  formData,
  onChange,
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
        {isEdit ? "Editar Apartamento" : "Registrar Apartamento"}
      </h2>

      <div>
        <label className="block font-medium mb-1">Torre:</label>
        <input
          type="text"
          name="torre"
          value={formData.torre}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          placeholder="Ej: Torre A"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Bloque:</label>
        <input
          type="text"
          name="bloque"
          value={formData.bloque}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          placeholder="Ej: Bloque 2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Piso:</label>
        <input
          type="text"
          name="piso"
          value={formData.piso}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          placeholder="Ej: 3"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Tipo:</label>
        <select
          name="tipoapartamento"
          value={formData.tipoapartamento}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccionar...</option>
          <option value="Residencial">Residencial</option>
          <option value="Comercial">Comercial</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 font-semibold text-white rounded-lg transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Guardando..."
          : isEdit
          ? "Actualizar Apartamento"
          : "Registrar Apartamento"}
      </button>
    </form>
  );
};
