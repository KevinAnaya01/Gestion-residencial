import { ApartamentoModel } from "../../../db/models/apartamento.model.js";

class ApartamentoService {
  async obtenerTodos() {
    return await ApartamentoModel.findAll();
  }

  async obtenerPorId(id) {
    const apartamento = await ApartamentoModel.findById(id);
    if (!apartamento) throw new Error("Apartamento no encontrado");
    return apartamento;
  }

  async registrar(datos) {
    return await ApartamentoModel.create(datos);
  }

  async actualizar(id, datos) {
    return await ApartamentoModel.update(id, datos);
  }

  async eliminar(id) {
    return await ApartamentoModel.remove(id);
  }
}

export const apartamentoService = new ApartamentoService();
