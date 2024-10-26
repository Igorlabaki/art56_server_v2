import { CreateNotificationController } from "./createNotificationController";

export const createNotificationFactory = () => {
/*   const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
  const createNotificationsCase = new CreateNotificationCase(prismaNotificationRepository); */
  const createNotificationController = new CreateNotificationController();

  return createNotificationController;
};
