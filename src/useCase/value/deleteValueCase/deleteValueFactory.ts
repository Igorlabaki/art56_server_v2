import { DeleteValueController } from "./deleteValueController";

export const deleteValueFactory = () => {
  /*   const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const deleteValuesCase = new DeleteValueCase(prismaValueRepository); */
  const deleteValueController = new DeleteValueController();

  return deleteValueController;
};
