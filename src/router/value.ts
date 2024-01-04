import { Router } from "express";
import { listvalueFactory } from "../useCase/value/listvalueCase/listvalueFactory";
import { createvalueFactory } from "../useCase/value/createvalueCase/createvalueFactory";
import { deletevalueFactory } from "../useCase/value/deletevalueCase/deletevalueFactory";
import { updateTextFactory } from "../useCase/text/updateTextCase/updateTextFactory";
import { getTextByIdFactory } from "../useCase/text/getTextByIdCase/getTextByIdFactory";
import { getTextByAreaFactory } from "../useCase/text/getTextByAreaCase/getTextByAreaFactory";

const valueRoutes = Router();

// Create
valueRoutes.post("/create", createvalueFactory().handle);
//

// List
valueRoutes.get("/list/:query?", listValueFactory().handle);
//

// Update
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
//

export { valueRoutes };
