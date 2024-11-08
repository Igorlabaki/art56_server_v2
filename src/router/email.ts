import { Router } from "express";
import { sendOrcamentoEmailFactory } from "../useCase/email/sendOrcamentoEmailCase/sendOrcamentoEmailFactory";
import { sendContratoEmailFactory } from "../useCase/email/sendContratoEmailCase/sendContratoEmailFactory";

const emailRoutes = Router();

// Create
emailRoutes.post("/orcamento", sendOrcamentoEmailFactory().handle);

emailRoutes.post("/contrato", sendContratoEmailFactory().handle);
//

export { emailRoutes };
