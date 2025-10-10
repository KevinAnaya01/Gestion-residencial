import express from "express";
import { apartamentoController } from "./apartamento.controller.js";

const router = express.Router();

router.get("/get", apartamentoController.obtenerTodos);
router.post("/post", apartamentoController.registrar);
router.put("/update/:id", apartamentoController.actualizar);
router.delete("/delete/:id", apartamentoController.eliminar);

export default router;
