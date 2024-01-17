import { ListDateController } from "./listDateController";

export const listDateEventFactory = () => {
  /*   const prismaDateRepository = new PrismaDateEventRepository(prismaClient);
  const listDateCase = new ListDatesCase(prismaDateRepository); */
  const listDateController = new ListDateController();

  return listDateController;
};
