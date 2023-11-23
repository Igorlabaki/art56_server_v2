import { Router } from "express";
import { listTextFactory } from "../useCase/text/listTextCase/listTextFactory";
import { createTextFactory } from "../useCase/text/createTextCase/createTextFactory";
import { deleteTextFactory } from "../useCase/text/deleteTextCase/deleteTextFactory";
import { updateTextFactory } from "../useCase/text/updateTextCase/updateTextFactory";
import { getTextByIdFactory } from "../useCase/text/getTextByIdCase/getTextByIdFactory";
import { getTextByAreaFactory } from "../useCase/text/getTextByAreaCase/getTextByAreaFactory";

const textRoutes = Router();

// Create
textRoutes.post("/create", createTextFactory().handle);
//

// List
textRoutes.get("/list", listTextFactory().handle);
//

// Update
textRoutes.put("/update/:textId", updateTextFactory().handle);
//

// Get By Id
textRoutes.get("/getById/:textId", getTextByIdFactory().handle);
//

// Get By Name
textRoutes.get("/getByArea/:area", getTextByAreaFactory().handle);
//

// Delete
textRoutes.delete("/delete/:textId", deleteTextFactory().handle);
//

export { textRoutes };
