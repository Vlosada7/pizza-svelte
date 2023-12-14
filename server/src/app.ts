import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router, createContext } from "./trpc";
import cors from "cors";
import { pizzasRouter } from "./routes/pizzas";

const app = express();
app.use(cors());

export const appRouter = router({
	pizza: pizzasRouter,
});

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

export type AppRouter = typeof appRouter;

export default app;
