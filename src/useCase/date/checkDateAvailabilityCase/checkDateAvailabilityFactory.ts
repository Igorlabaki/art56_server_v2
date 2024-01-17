import { CheckDateAvailabilityController } from "./checkDateAvailabilityController";


export const checkDateAvailabilityFactory = () => {
 /*  const prismaDateRepository = new PrismaDateEventRepository(prismaClient);
  const checkDateAvailabilityCase = new CheckDateAvailabilityCase(prismaDateRepository); */
  const checkDateAvailabilityController = new CheckDateAvailabilityController();

  return checkDateAvailabilityController;
};
