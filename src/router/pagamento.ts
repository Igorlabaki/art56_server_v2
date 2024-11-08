import { Router } from "express";
import { createPagamentoFactory } from "../useCase/pagamento/createPagamentoCase/createValueFactory";
import { deletePagamentoFactory } from "../useCase/pagamento/deletePagamentoCase/deletePagamentoFactory";
import { getPagamentoByIdFactory } from "../useCase/pagamento/getPagamentoByIdCase/getPagamentoByIdFactory";
import { getPagamentoByOrcamentoFactory } from "../useCase/pagamento/getPagamentoByOrcamentoCase/getPagamentoByOrcamentoFactory";
import { listPagamentoFactory } from "../useCase/pagamento/listPagamentoCase/listPagamentoFactory";
import { updatePagamentoFactory } from "../useCase/pagamento/updatePagamentoCase/updatePagamentoFactory";


const pagamentoRoutes = Router();

// Create
pagamentoRoutes.post("/create", createPagamentoFactory().handle);
//

// List
pagamentoRoutes.get("/list/:query?", listPagamentoFactory().handle);
//


// Delete
pagamentoRoutes.delete("/delete/:pagamentoId", deletePagamentoFactory().handle);
// */

//Get By Id
pagamentoRoutes.get("/getById/:pagamentoId", getPagamentoByIdFactory().handle);
//

//Get By Id
pagamentoRoutes.get("/getByOrcamentoId/:orcamentoId", getPagamentoByOrcamentoFactory().handle);
//

// Update
pagamentoRoutes.put("/update/:pagamentoId", updatePagamentoFactory().handle);
// 

export { pagamentoRoutes };
