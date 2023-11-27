import { Response, Request } from "express";
import { prismaClient } from "../../../service/prisma";
import { GetTextByAreaCase } from "./getTextByAreaCase";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

class GetTextByAreaController {
  /* constructor(private getTextByAreaCase: GetTextByAreaCase) {} */

  async handle(req: Request, resp: Response) {
    const { area } = req.params;

    const prismaRepository = new PrismaTextRepository(prismaClient);
    const getTextByAreaCase = new GetTextByAreaCase(prismaRepository);

    try {
      const textByArea = await getTextByAreaCase.execute(area);
      return resp.json(textByArea);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetTextByAreaController };
