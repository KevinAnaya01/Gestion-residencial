import { AuthModel } from "./auth.model.js";

class AuthService {
  async login(email, contraseña) {
    const user = await AuthModel.findBycredentials(email, contraseña);
    delete user.contrase_a;
    return user;
  }
}

export const authService = new AuthService();