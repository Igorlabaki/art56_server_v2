import { ListValueController } from "./listValueController";

export const listValueFactory = () => {
  /*  const prismaImageRepository = new PrismaValueRepository(prismaClient);
  const listValueCase = new ListValuesCase(prismaImageRepository); */
  const listValueController = new ListValueController();

  return listValueController;
};
