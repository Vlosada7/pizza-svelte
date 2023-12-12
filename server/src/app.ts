import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router, createContext } from "./trpc";
import cors from "cors";

const app = express();
app.use(cors());

export default app;
