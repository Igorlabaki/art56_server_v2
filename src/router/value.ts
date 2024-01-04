import { Router } from "express";

import { listValueFactory } from "../useCase/value/listValueCase/listValueFactory";
import { createValueFactory } from "../useCase/value/createValueCase/createValueFactory";

const valueRoutes = Router();

// Create
valueRoutes.post("/create", createValueFactory().handle);
//

// List
valueRoutes.get("/list/:query?", listValueFactory().handle);
//

/* // Update
valueRoutes.put("/update/:valueId", updateValueFactory().handle);
//

// Get By Id
valueRoutes.get("/getById/:valueId", getValueByIdFactory().handle);
//

// Get By Name
valueRoutes.get("/getByArea/:area", getvalueByTituloFactory().handle);
//

// Delete
valueRoutes.delete("/delete/:valueId", deleteValueFactory().handle);
// */

export { valueRoutes };
