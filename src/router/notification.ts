import { Router } from "express";
import { deleteNotificationFactory } from "../useCase/notification/deleteNotificationCase/deleteNotificationFactory";
import { getNotificationByIdFactory } from "../useCase/notification/getNotificationByIdCase/getNotificationByIdFactory";
import { createNotificationFactory } from "../useCase/notification/createNotificationCase/createNotificationFactory";

import { updateNotificationFactory } from "../useCase/notification/updateNotificationCase/updateNotificationFactory";
import { listNotificationFactory } from "../useCase/notification/listNotificationCase/listNotificationFactory";


const notificationRoutes = Router();

// Create
notificationRoutes.post("/create", createNotificationFactory().handle);
//

// List
notificationRoutes.get("/list/:query?", listNotificationFactory().handle);
////

// Delete
notificationRoutes.delete(
  "/delete/:notificationId",
  deleteNotificationFactory().handle
);
// */

//Get By Id
notificationRoutes.get(
  "/getById/:notificationId",
  getNotificationByIdFactory().handle
);
//

// Update
notificationRoutes.put(
  "/update/:notificationId",
  updateNotificationFactory().handle
);
//

export { notificationRoutes };
