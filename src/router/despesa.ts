import { Router } from "express";
import { createDespesaFactory } from "../useCase/despesa/createDespesaCase/despesaOrcamentoFactory";
import { listDespesaFactory } from "../useCase/despesa/listDespesa/listDespesaFactory";
import { deleteDespesaFactory } from "../useCase/despesa/deleteDespesaCase/deleteDespesaFactory";
import { updateDespesaFactory } from "../useCase/despesa/updateDespesaCase/updateImageFactory";
import { getDespesaByIdFactory } from "../useCase/despesa/getDespesaByIdCase/getDespesaByIdFactory";

const despesaRoutes = Router();

// Create
despesaRoutes.post("/create", createDespesaFactory().handle);
//

// List
despesaRoutes.get("/list/:query?", listDespesaFactory().handle);
//

// Delete
despesaRoutes.delete("/delete/:despesaId", deleteDespesaFactory().handle);
// 

//Get By Id
despesaRoutes.get("/getById/:despesaId", getDespesaByIdFactory().handle);
//

// Update
despesaRoutes.put("/update/:despesaId", updateDespesaFactory().handle);
// 

export { despesaRoutes };
