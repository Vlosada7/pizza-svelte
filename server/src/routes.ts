import { Router } from "express";
import * as pizzaController from "./controllers/pizzaController";

const router = Router();

router.get("/pizzas", pizzaController.postPizzas);

export default router;
