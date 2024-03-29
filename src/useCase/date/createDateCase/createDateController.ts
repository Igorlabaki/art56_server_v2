import { Request, Response } from "express";
import { IDateEventParams } from "../../../repository/IDateEventRepository";
import { PrismaDateEventRepository } from "../../../repository/inPrisma/prismaDateEventRepository";
import { prismaClient } from "../../../service/prisma";
import { CreateDateEventCase } from "./createDateCase";


class CreateDateController {
  constructor() {}

  async handle(req: Request, resp: Response ) {
    const data: IDateEventParams = req.body;

    const prismaDateEventRepository = new PrismaDateEventRepository(
      prismaClient
    );
    const createDateEventCase = new CreateDateEventCase(
      prismaDateEventRepository
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
