import { Request, Response } from "express";
import { PrismaDateEventRepository } from "../../../repository/inPrisma/prismaDateEventRepository";
import { prismaClient } from "../../../service/prisma";
import { GetDateEventByDateCase } from "./getDataByDateCase";

class GetDataByDateController {
  constructor() {}

  async handle(resp: Response, req: Request) {

    const {date}  = req.params

    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const getDateEventByDateCase = new GetDateEventByDateCase(prismaDateEventRepository);

    try {
      const dateEventByDate = await getDateEventByDateCase.execute({date});
      return resp.json(dateEventByDate);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetDataByDateController };
