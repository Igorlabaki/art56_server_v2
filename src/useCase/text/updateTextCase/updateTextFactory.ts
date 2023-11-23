import { UpdateTextCase } from "./updateTextCase";
import { prismaClient } from "../../../service/prisma";
import { UpdateTextController } from "./updateTextController";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

export const updateTextFactory = () => {
/*   const prismaTextRepository = new PrismaTextRepository(prismaClient);
  const updateTextsCase = new UpdateTextCase(prismaTextRepository); */
  const updateTextController = new UpdateTextController();

  return updateTextController;
};
