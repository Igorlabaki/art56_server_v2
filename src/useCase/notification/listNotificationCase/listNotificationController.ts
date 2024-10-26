import { Request, Response } from "express";
import { ListNotificationsCase } from "./listNotificationCase";
import { PrismaNotificationRepository } from "../../../repository/inPrisma/prismaNotificationRepository";
import { prismaClient } from "../../../service/prisma";

class ListNotificationController {
  constructor() {}

  async handle(req: Request, response: Response) {
    const { query } = req.params;

    const prismaNotificationRepository = new PrismaNotificationRepository(
      prismaClient
    );
    const listNotificationCase = new ListNotificationsCase(
      prismaNotificationRepository
    );

    const NotificationList = await listNotificationCase.execute(query);

    return response.json(NotificationList);
  }
}

export { ListNotificationController };
