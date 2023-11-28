import { Request, Response } from 'express';
import { ListTextsCase } from './listTextsCase';
import { prismaClient } from "../../../service/prisma";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

class ListTextController {
  async handle(req: Request , response: Response) {
    const {query} = req.params
    
    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const listTextCase = new ListTextsCase(prismaTextRepository);

    const textList = await listTextCase.execute(query);

    return response.json(textList);
  }
}

export { ListTextController };
