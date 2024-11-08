
import { SendContratoEmailCase } from './sendContratoEmailCase';
import { Request,Response } from 'express';

interface ISenEmailProps{
  email: string;
  pdfBase64: string;
  nome: string;
}

class SendContratoEmailController {
  constructor() {}

  async handle(req: Request,res: Response) {
    const data : ISenEmailProps = req.body;
    const sendContratoEmailCase = new SendContratoEmailCase();

    try {
      await sendContratoEmailCase.execute({
        email: data.email,
        nome: data.nome,
        pdfBase64: data.pdfBase64
      });
      return res.status(200).json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error); // Log para depuração
      return res.status(400).json({ message: "Erro ao enviar e-mail", error: error.message });
    }
  }
}

export { SendContratoEmailController };

/* resp.json(contratoEmail);
resp.status(400).json({ error: error.message }); */