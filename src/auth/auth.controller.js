import { authService } from "./auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await authService.login(email, contraseña);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
