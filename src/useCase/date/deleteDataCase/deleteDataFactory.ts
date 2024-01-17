import { DeleteDataController } from "./deleteDataController";

export const deleteDateEventFactory = () => {
/*   const prismaDataRepository = new PrismaDateEventRepository(prismaClient);
  const deleteDatasCase = new DeleteDataCase(prismaDataRepository); */
  const deleteDataController = new DeleteDataController();

  return deleteDataController;
};
