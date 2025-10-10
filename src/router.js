import express from "express";
import authRoutes from "./auth/auth.routes.js";
import apartamentoRoutes from "./apartamentos/apartamento.routes.js";

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api", router);

  router.use("/auth", authRoutes);
  router.use("/apartamentos", apartamentoRoutes);
};


export default routerApi;

