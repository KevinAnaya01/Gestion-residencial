import { useState, useEffect } from "react";
import type { apartamento } from "./apartamento";
import {
  actualizarApartamento,
  eliminarApartamento,
  obtenerApartamentos,
  registrarApartamento,
} from "../api/axios/apartamento.api";

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
      return data;
    } catch (err: any) {
      setError(err.message || "Error al registrar apartamento");
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
      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar apartamento");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar apartamento
  const deleteApartamento = async (id: number) => {
    try {
      setLoading(true);
      await eliminarApartamento(id);
      setApartamentos((prev) => prev.filter((apt) => apt.id !== id));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al eliminar apartamento");
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
