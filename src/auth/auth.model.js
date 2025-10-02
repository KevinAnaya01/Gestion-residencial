import { prisma } from "../../prisma/prismaClient.js";

export const AuthModel = {
  async findByCredentials(email, contraseña) {
    return await prisma.usuario.findFirst({
      where: {
        correo: email,
        contrase_a: contraseña,
      },
    });
  },
};
