import { CreateValueController } from "./createValueController";

export const createValueFactory = () => {
/*   const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const createValuesCase = new CreateValueCase(prismaValueRepository); */
  const createValueController = new CreateValueController();

  return createValueController;
};
