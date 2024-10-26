import { Request, Response } from "express";
import { PrismaNotificationRepository } from "../../../repository/inPrisma/prismaNotificationRepository";
import { prismaClient } from "../../../service/prisma";
import { DeleteNotificationCase } from "./deleteNotificationCase";

class DeleteNotificationController {
  /*  constructor(private deleteNotificationCase: DeleteNotificationCase) {} */

  async handle(req: Request, resp: Response) {
    const { notificationId } = req.params;

    const prismaNotificationRepository = new PrismaNotificationRepository(
      prismaClient
    );
    const deleteNotificationCase = new DeleteNotificationCase(
      prismaNotificationRepository
    );

    try {
      const deleteNotification = await deleteNotificationCase.execute(
        notificationId
      );
      return resp.json(deleteNotification);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteNotificationController };
