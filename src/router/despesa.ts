import { Router } from "express";
import { createDespesaFactory } from "../useCase/despesa/despesaOrcamentoCase/despesaOrcamentoFactory";
import { listDespesaFactory } from "../useCase/despesa/listDespesa/listDespesaFactory";

const despesaRoutes = Router();

// Create
despesaRoutes.post("/create", createDespesaFactory().handle);
//

// List
despesaRoutes.get("/list/:query?", listDespesaFactory().handle);
//

/* // Delete
despesaRoutes.delete("/delete/:imageId", deleteImageFactory().handle);
// */

/* //Get By Id
despesaRoutes.get("/getById/:imageId", getImageByIdFactory().handle);
// */

/* // Update
despesaRoutes.put("/update/:imageId", updateImageFactory().handle);
//  */ 

export { despesaRoutes };
