import { DeleteTextCase } from "./deleteTextCase";
import { prismaClient } from "../../../service/prisma";
import { DeleteTextController } from "./deleteTextController";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

export const deleteTextFactory = () => {
/*   const prismaTextRepository = new PrismaTextRepository(prismaClient);
  const deleteTextsCase = new DeleteTextCase(prismaTextRepository); */
  const deleteTextController = new DeleteTextController();

  return deleteTextController;
};
