import { CreateDateController } from "./createDateController";

export const createDateEventFactory = () => {
/*   const prismaDateRepository = new PrismaDateEventRepository(prismaClient);
  const createDatesCase = new CreateDateCase(prismaDateRepository); */
  const createDateController = new CreateDateController();

  return createDateController;
};
