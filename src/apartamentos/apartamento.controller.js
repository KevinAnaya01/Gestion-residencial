import { apartamentoService } from "./apartamento.service.js";

export const apartamentoController = {
  async obtenerTodos(req, res) {
    try {
      const data = await apartamentoService.obtenerTodos();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async registrar(req, res) {
    try {
      const data = await apartamentoService.registrar(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async actualizar(req, res) {
    try {
      const data = await apartamentoService.actualizar(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async eliminar(req, res) {
    try {
      await apartamentoService.eliminar(req.params.id);
      res.json({ message: "Apartamento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
