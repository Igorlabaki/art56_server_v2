import { Router, json } from "express";

const authRoutes = Router();

authRoutes.get("/helloWorld",() => {
   console.log("Hello")
   return 
})


export {authRoutes}