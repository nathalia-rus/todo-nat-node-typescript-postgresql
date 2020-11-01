import express, { Router } from "express";

import TodosController from "../controllers/TodosControllers";

const router = Router();

const todosController = new TodosController();

router.get("/todos", todosController.getAllTodos);

export default router;
