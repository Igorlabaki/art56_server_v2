import { UpdateValueCase } from "./updateValueCase";
import { prismaClient } from "../../../service/prisma";
import { UpdateValueController } from "./updateValueController";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";

export const updateValueFactory = () => {
/*   const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const updateValuesCase = new UpdateValueCase(prismaValueRepository); */
  const updateValueController = new UpdateValueController();

  return updateValueController;
};
