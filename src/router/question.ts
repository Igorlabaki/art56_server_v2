import { Router } from "express";
import { createQuestionFactory } from "../useCase/question/createQuestionCase/createQuestionFactory";
import { deleteQuestionFactory } from "../useCase/question/deleteQuestionCase/deleteQuestionFactory";
import { listQuestionFactory } from "../useCase/question/listQuestionCase/listQuestionFactory";
import { getByQuestionFactory } from "../useCase/question/getByQuestionCase/getByQuestionFactory";
import { getQuestionByIdFactory } from "../useCase/question/getQuestionByIdCase/getQuestionByIdFactory";
import { updateQuestionFactory } from "../useCase/question/updateQuestionCase/updateQuestionFactory";


const questionRoutes = Router();

// Create
questionRoutes.post("/create", createQuestionFactory().handle);
//

// List
questionRoutes.get("/list/:query?", listQuestionFactory().handle);
//

// Update
questionRoutes.put("/update/:questionId", updateQuestionFactory().handle);
//

// Get By Id
questionRoutes.get("/getById/:questionId", getQuestionByIdFactory().handle);
//

// Get By Question
questionRoutes.get("/getByQuestion/:question", getByQuestionFactory().handle);
//

// Delete
questionRoutes.delete("/delete/:questionId", deleteQuestionFactory().handle);
//

export { questionRoutes };
