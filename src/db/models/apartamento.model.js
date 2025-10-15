import { prisma } from "../../../prisma/prismaClient.js";

export const ApartamentoModel = {
  async findAll() {
    return await prisma.apartamento.findMany();
  },

  async findById(id) {
    return await prisma.apartamento.findUnique({
      where: { id: Number(id) },
    });
  },

  async create(data) {
    return await prisma.apartamento.create({
      data: {
        torre: data.torre,
        bloque: data.bloque,
        piso: data.piso,
        tipoapartamento: data.tipoapartamento,
      },
    });
  },

  async update(id, data) {
    return await prisma.apartamento.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return await prisma.apartamento.delete({
      where: { id: Number(id) },
    });
  },
};
