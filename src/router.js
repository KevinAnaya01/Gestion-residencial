import express from "express";
import authRoutes from "./auth/auth.routes.js";

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api", router);

  router.use("/auth", authRoutes);
};

export default routerApi;
