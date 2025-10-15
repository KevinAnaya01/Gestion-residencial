import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import type { apartamento } from "../interface/apartamento";
import {
  actualizarApartamento,
  eliminarApartamento,
  obtenerApartamentos,
  registrarApartamento,
} from "../../../api/axios/apartamento.api";

export const useApartamento = () => {
  const [apartamentos, setApartamentos] = useState<apartamento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Obtener todos los apartamentos
  const fetchApartamentos = async () => {
    try {
      setLoading(true);
      const data = await obtenerApartamentos();
      setApartamentos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al obtener los apartamentos");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Registrar nuevo apartamento
  const createApartamento = async (nuevo: apartamento) => {
    try {
      setLoading(true);
      const data = await registrarApartamento(nuevo);
      setApartamentos((prev) => [...prev, data]);
      setError(null);

      // ✅ Alerta de éxito
      Swal.fire({
        title: "Apartamento registrado",
        text: "El apartamento fue agregado correctamente.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      return data;
    } catch (err: any) {
      setError(err.message || "Error al registrar apartamento");

      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el apartamento.",
        icon: "error",
        confirmButtonColor: "#d33",
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Actualizar apartamento
  const updateApartamento = async (id: number, actualizado: apartamento) => {
    try {
      setLoading(true);
      const data = await actualizarApartamento(id, actualizado);
      setApartamentos((prev) =>
        prev.map((apt) => (apt.id === id ? data : apt))
      );
      setError(null);

      // ✅ Alerta de éxito
      Swal.fire({
        title: "Apartamento actualizado",
        text: "Los datos se guardaron correctamente.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar apartamento");

      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el apartamento.",
        icon: "error",
        confirmButtonColor: "#d33",
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar apartamento
  const deleteApartamento = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Eliminar apartamento?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;

      setLoading(true);
      await eliminarApartamento(id);
      setApartamentos((prev) => prev.filter((apt) => apt.id !== id));
      setError(null);

      // ✅ Alerta de éxito
      Swal.fire({
        title: "Eliminado",
        text: "El apartamento fue eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } catch (err: any) {
      setError(err.message || "Error al eliminar apartamento");

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el apartamento.",
        icon: "error",
        confirmButtonColor: "#d33",
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar automáticamente al montar el hook
  useEffect(() => {
    fetchApartamentos();
  }, []);

  return {
    apartamentos,
    loading,
    error,
    fetchApartamentos,
    createApartamento,
    updateApartamento,
    deleteApartamento,
  };
};
