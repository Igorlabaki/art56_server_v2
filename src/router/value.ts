import { Router } from "express";

import { listValueFactory } from "../useCase/value/listValueCase/listValueFactory";
import { createValueFactory } from "../useCase/value/createValueCase/createValueFactory";
import { getValueByIdFactory } from "../useCase/value/getValueByIdCase/getValueByIdFactory";
import { getValueByTituloFactory } from "../useCase/value/getValueByTituloCase/getValueByTituloFactory";
import { deleteValueFactory } from "../useCase/value/deleteValueCase/deleteValueFactory";

const valueRoutes = Router();

// Create
valueRoutes.post("/create", createValueFactory().handle);
//

// List
valueRoutes.get("/list/:query?", listValueFactory().handle);
//

// Get By Name
valueRoutes.get("/getByTitulo/:titulo", getValueByTituloFactory().handle);
//

// Delete
valueRoutes.delete("/delete/:valueId", deleteValueFactory().handle);
// */

//Get By Id
valueRoutes.get("/getById/:valueId", getValueByIdFactory().handle);
//

/*  // Update
valueRoutes.put("/update/:valueId", updateValueFactory().handle);
// */

export { valueRoutes };
