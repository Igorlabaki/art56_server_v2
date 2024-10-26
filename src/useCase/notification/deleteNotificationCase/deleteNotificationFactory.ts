import { DeleteNotificationController } from "./deleteNotificationController";

export const deleteNotificationFactory = () => {
  /*   const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
  const deleteNotificationsCase = new DeleteNotificationCase(prismaNotificationRepository); */
  const deleteNotificationController = new DeleteNotificationController();

  return deleteNotificationController;
};
