import { Router } from "express";
import { postRoutes } from "./postRoutes";
import userRoutes from "./userRoutes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);
routes.use("/", (request,response) => {
  response.send({message : "Bem vindo a api do Postgram!", statusMessage: "OK"})
})

