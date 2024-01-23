import { Router } from "express";
import { creatImageFactory } from "../useCase/image/createImageCase/createImageFactory";
import { listImagesFactory } from "../useCase/image/listImages/listImagesFactory";
import { deleteImageFactory } from "../useCase/image/deleteImageCase/deleteImageFactory";
import { getImageByIdFactory } from "../useCase/image/getImageByIdCase/getImageByIdFactory";
import { updateImageFactory } from "../useCase/image/updateImageCase/updateImageFactory";


const imageRoutes = Router();

// Create
imageRoutes.post("/create", creatImageFactory().handle);
//

// List
imageRoutes.get("/list/:query?", listImagesFactory().handle);
//

// Delete
imageRoutes.delete("/delete/:imageId", deleteImageFactory().handle);
// */

//Get By Id
imageRoutes.get("/getById/:imageId", getImageByIdFactory().handle);
//

//Get By Id
imageRoutes.get("/getByTag/:tag/:responsiveMode", getImageByIdFactory().handle);
//

// Update
imageRoutes.put("/update/:imageId", updateImageFactory().handle);
// 

export { imageRoutes };
