import { ListNotificationController } from "./listNotificationController";

export const listNotificationFactory = () => {
  /*  const prismaImageRepository = new PrismaNotificationRepository(prismaClient);
  const listNotificationCase = new ListNotificationsCase(prismaImageRepository); */
  const listNotificationController = new ListNotificationController();

  return listNotificationController;
};
