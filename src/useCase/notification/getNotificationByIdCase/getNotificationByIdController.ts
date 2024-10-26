import { Request, Response } from "express";
import { PrismaNotificationRepository } from "../../../repository/inPrisma/prismaNotificationRepository";
import { prismaClient } from "../../../service/prisma";
import { GetNotificationByIdCase } from "./getNotificationByIdCase";

class GetNotificationByIdController {
  /* constructor(private getNotificationByIdCase: GetNotificationByIdCase) {} */

  async handle(req: Request, resp: Response) {
    const { notificationId } = req.params;

    const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
    const getNotificationByIdCase = new GetNotificationByIdCase(prismaNotificationRepository);

    try {
      const NotificationById = await getNotificationByIdCase.execute(notificationId);
      return resp.json(NotificationById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetNotificationByIdController };
