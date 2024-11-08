
import { SendOrcamentoEmailCase } from './sendOrcamentoEmailCase';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { IOrcamentoParams } from '../../../repository/IOrcamentoRepository';

import { CreateOrcamentoCase } from '../../Orcamento/createOrcamentoCase/createOrcamentoCase';
import { Request,Response } from 'express';

interface ISenEmailProps{
  email: string;
  orcamentoId: string;
  nome: string;
}

class SendOrcamentoEmailController {
  constructor() {}

  async handle(req: Request,res: Response) {
    const data : ISenEmailProps = req.body;
    const sendOrcamentoEmailCase = new SendOrcamentoEmailCase();

    try {
      await sendOrcamentoEmailCase.execute({
        email: data.email,
        nome: data.nome,
        orcamentoId: data.orcamentoId
      });
      return res.status(200).json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error); // Log para depuração
      return res.status(400).json({ message: "Erro ao enviar e-mail", error: error.message });
    }
  }
}

export { SendOrcamentoEmailController };

/* resp.json(orcamentoEmail);
resp.status(400).json({ error: error.message }); */