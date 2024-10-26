import { UpdateNotificationController } from "./updateNotificationController";

export const updateNotificationFactory = () => {
/*   const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
  const updateNotificationsCase = new UpdateNotificationCase(prismaNotificationRepository); */
  const updateNotificationController = new UpdateNotificationController();

  return updateNotificationController;
};
