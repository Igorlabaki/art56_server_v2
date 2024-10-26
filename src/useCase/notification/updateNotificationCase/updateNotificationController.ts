import { Request, Response } from "express";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { UpdateNotificationCase } from "./updateNotificationCase";
import { IUpdateNotificationParams } from "../../../repository/INotificacaoRepository";
import { PrismaNotificationRepository } from "../../../repository/inPrisma/prismaNotificationRepository";


class UpdateNotificationController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { notificationId } = req.params;
    const { data }  : IUpdateNotificationParams =
      req.body;

    validateInput([!!notificationId]);

    const prismaNotificationRepository = new PrismaNotificationRepository(
      prismaClient
    );
    const updateNotificationCase = new UpdateNotificationCase(
      prismaNotificationRepository
    );

    try {
      const updateNotification = await updateNotificationCase.execute({
        notificationId,
        data: data
      });
      return resp.json(updateNotification);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateNotificationController };
