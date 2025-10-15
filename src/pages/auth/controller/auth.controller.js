import { authService } from "../../auth/services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await authService.login(email, contraseña);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};
