import { Router } from "express";
import * as pizzaController from "./controllers/pizza";
import * as userController from "./controllers/user";
import * as cartController from "./controllers/cart";

const router = Router();

// Pizza
router.post("/pizza", pizzaController.createPizza);
router.get("/pizza/:id", pizzaController.getPizza);

// User
router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUser);
router.put("/user/:id", userController.updateUser);

// Cart
router.post("/cart", cartController.createCart);
router.put("/cart/:id", cartController.updateCart);

export default router;
