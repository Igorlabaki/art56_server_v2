import { Request, Response } from 'express';
import { prismaClient } from '../../../service/prisma';
import { CreateNotificationCase } from './createNotificationCase';
import { INotificationParams } from '../../../repository/INotificacaoRepository';
import { PrismaNotificationRepository } from '../../../repository/inPrisma/prismaNotificationRepository';
import { pusher } from '../../../server';

class CreateNotificationController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data: INotificationParams = req.body;

    const prismaTextRepository = new PrismaNotificationRepository(prismaClient);
    const createNotificationCase = new CreateNotificationCase(prismaTextRepository);

    try {
      const newNotification = await createNotificationCase.execute(data);
      return resp.json(newNotification);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateNotificationController };
