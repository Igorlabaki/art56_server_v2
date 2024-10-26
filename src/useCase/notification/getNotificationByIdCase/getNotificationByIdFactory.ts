import { GetNotificationByIdController } from './getNotificationByIdController';

export const getNotificationByIdFactory = () => {
/*   const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
  const getNotificationByIdCase = new GetNotificationByIdCase(prismaNotificationRepository); */
  const getNotificationByIdController = new GetNotificationByIdController();

  return getNotificationByIdController;
};
