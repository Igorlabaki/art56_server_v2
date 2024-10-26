import { Request, Response } from "express";
import { IDateEventParams } from "../../../repository/IDateEventRepository";
import { PrismaDateEventRepository } from "../../../repository/inPrisma/prismaDateEventRepository";
import { prismaClient } from "../../../service/prisma";
import { CreateDateEventCase } from "./createDateCase";
import { PrismaNotificationRepository } from "../../../repository/inPrisma/prismaNotificationRepository";


class CreateDateController {
  constructor() {}

  async handle(req: Request, resp: Response ) {
    const data: IDateEventParams = req.body;

    const prismaDateEventRepository = new PrismaDateEventRepository(
      prismaClient
    );
    const prismaNotificationRepository = new PrismaNotificationRepository(
      prismaClient
    );
    const createDateEventCase = new CreateDateEventCase(
      prismaDateEventRepository, prismaNotificationRepository
    );
      
    try {
      const newDateEvent = await createDateEventCase.execute(data);
      return resp.json(newDateEvent);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateDateController };
