import { prisma } from "../../prisma/prismaClient.js";

export const AuthModel = {
  async findByCredentials(email, contraseña) {
    try {
      const user = await prisma.usuario.findFirst({
        where: { correo:email, contrase_a: contraseña },
      });

      if (!user) {
        throw new Error("Correo electrónico o contraseña incorrectos");
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
