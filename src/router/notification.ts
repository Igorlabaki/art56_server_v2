import { Router } from "express";

import { listNotificationFactory } from "../useCase/Notification/listNotificationCase/listNotificationFactory";
import { createNotificationFactory } from "../useCase/Notification/createNotificationCase/createNotificationFactory";
import { getNotificationByIdFactory } from "../useCase/Notification/getNotificationByIdCase/getNotificationByIdFactory";

import { deleteNotificationFactory } from "../useCase/Notification/deleteNotificationCase/deleteNotificationFactory";
import { updateNotificationFactory } from "../useCase/notification/updateNotificationCase/updateNotificationFactory";


const notificationRoutes = Router();

// Create
notificationRoutes.post("/create", createNotificationFactory().handle);
//

// List
notificationRoutes.get("/list/:query?", listNotificationFactory().handle);
////

// Delete
notificationRoutes.delete("/delete/:notificationId", deleteNotificationFactory().handle);
// */

//Get By Id
notificationRoutes.get("/getById/:notificationId", getNotificationByIdFactory().handle);
//

// Update
notificationRoutes.put("/update/:notificationId", updateNotificationFactory().handle);
// 

export { notificationRoutes };
