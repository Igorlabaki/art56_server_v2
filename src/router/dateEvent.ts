import { Router } from "express";
import { listTextFactory } from "../useCase/text/listTextCase/listTextFactory";
import { createTextFactory } from "../useCase/text/createTextCase/createTextFactory";
import { deleteTextFactory } from "../useCase/text/deleteTextCase/deleteTextFactory";
import { updateTextFactory } from "../useCase/text/updateTextCase/updateTextFactory";
import { getTextByIdFactory } from "../useCase/text/getTextByIdCase/getTextByIdFactory";
import { getTextByAreaFactory } from "../useCase/text/getTextByAreaCase/getTextByAreaFactory";
import { createDateEventFactory } from "../useCase/date/createDateCase/createDateFactory";
import { deleteDateEventFactory } from "../useCase/date/deleteDataCase/deleteDataFactory";
import { listDateEventFactory } from "../useCase/date/listDateCase/listDateFactory";
import { updateDateEventFactory } from "../useCase/date/updateDateCase/updateDateFactory";
import { getDateEventByIdFactory } from "../useCase/date/getDataByIdCase/getDataByIdFactory";

const dateEventRoutes = Router();

// Create
dateEventRoutes.post("/create", createDateEventFactory().handle);
//

// List
dateEventRoutes.get("/list/:query?", listDateEventFactory().handle);
//

// Update
dateEventRoutes.put("/update/:dateEventId", updateDateEventFactory().handle);
//

// Get By Id
dateEventRoutes.get("/getById/:dateEventId", getDateEventByIdFactory().handle);
//

// Delete
dateEventRoutes.delete("/delete/:dateEventId", deleteDateEventFactory().handle);
//

export { dateEventRoutes };
