import { Router } from "express";
import { createOrcamentoFactory } from "../useCase/Orcamento/createOrcamentoCase/createOrcamentoFactory";
import { listOrcamentoFactory } from "../useCase/Orcamento/listOrcamentoCase/listOrcamentoFactory";
import { deleteOrcamentoFactory } from "../useCase/Orcamento/deleteOrcamentoCase/deleteOrcamentoFactory";
import { getOrcamentoByIdFactory } from "../useCase/Orcamento/getOcamentoByIdCase/getOrcamentoByIdFactory";
import { updateOrcamentoFactory } from "../useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory";
import { getTrafegoCountFactory } from "../useCase/Orcamento/getTrafegoCount/getTrafegoCountFactory";
import { listOrcamentoAprovadoFactory } from "../useCase/Orcamento/listOrcamentoAprovadoCase/listOrcamentoAprovadoFactory";
import { getMonthCountFactory } from "../useCase/Orcamento/getMonthCount/getMonthCountFactory";


const orcamentoRoutes = Router();

// Create
orcamentoRoutes.post("/create", createOrcamentoFactory().handle);
//

// List
orcamentoRoutes.get("/list/:query?/:year?/:month?", listOrcamentoFactory().handle);
//

// List Aprovado
orcamentoRoutes.get("/listAprovado/:query?/:year?/:month?", listOrcamentoAprovadoFactory().handle);
//

// Delete
orcamentoRoutes.delete("/delete/:orcamentoId", deleteOrcamentoFactory().handle);
// 

//Get By Id
orcamentoRoutes.get("/getById/:orcamentoId", getOrcamentoByIdFactory().handle);
//

// Update
orcamentoRoutes.put("/update/:orcamentoId", updateOrcamentoFactory().handle);
// 
// Update
orcamentoRoutes.get("/getTrafegoCount", getTrafegoCountFactory().handle);

orcamentoRoutes.get("/getMonthCount", getMonthCountFactory().handle);
// 

export { orcamentoRoutes };
