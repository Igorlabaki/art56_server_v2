import { CreateTextCase } from "./createTextCase";
import { prismaClient } from "../../../service/prisma";
import { CreateTextController } from "./createTextController";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

export const createTextFactory = () => {
/*   const prismaTextRepository = new PrismaTextRepository(prismaClient);
  const createTextsCase = new CreateTextCase(prismaTextRepository); */
  const createTextController = new CreateTextController();

  return createTextController;
};
