import { Router } from "express";
import { sendOrcamentoEmailFactory } from "../useCase/email/sendOrcamentoEmailCase/sendOrcamentoEmailFactory";

const emailRoutes = Router();

// Create
emailRoutes.post("/orcamento", sendOrcamentoEmailFactory().handle);
//

export { emailRoutes };
