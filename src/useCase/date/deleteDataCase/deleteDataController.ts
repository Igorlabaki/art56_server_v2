import { Request, Response } from "express";
import { PrismaDateEventRepository } from "../../../repository/inPrisma/prismaDateEventRepository";
import { prismaClient } from "../../../service/prisma";
import { DeleteDateEventCase } from "./deleteDataCase";

class DeleteDataController {
  constructor() {}

  async handle(resp: Response, req: Request) {
    const { dateEventId } = req.params;

    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const deleteDateEventCase = new DeleteDateEventCase(prismaDateEventRepository);

    try {
      const deleteDateEvent = await deleteDateEventCase.execute(dateEventId);
      return resp.json(deleteDateEvent);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }    
  }
}

export { DeleteDataController };
