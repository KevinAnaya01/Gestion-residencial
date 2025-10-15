import express from "express";
import authRoutes from "./routes/auth.routes.js";
import apartamentoRoutes from "./routes/apartamento.routes.js";

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api", router);

  router.use("/auth", authRoutes);
  router.use("/apartamentos", apartamentoRoutes);
};


export default routerApi;

