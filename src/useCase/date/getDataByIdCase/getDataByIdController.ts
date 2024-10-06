
import { Request, Response } from "express";
import { PrismaDateEventRepository } from "../../../repository/inPrisma/prismaDateEventRepository";
import { prismaClient } from "../../../service/prisma";
import { GetDateEventByIdCase } from "./getDataByIdCase";


class GetDataByIdController {
  constructor() {}

  async handle(resp: Response, req: Request) {

    const {dateEventId}  = req.params

    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const getDateEventByIdCase = new GetDateEventByIdCase(prismaDateEventRepository);

    try {
      const dateEventById = await getDateEventByIdCase.execute(dateEventId);
      return resp.json(dateEventById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetDataByIdController };
