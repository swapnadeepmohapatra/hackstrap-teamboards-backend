import express from "express";
import cors from "cors";
import { DB } from "./DB/DB";
import projectRouter from "./routes/projectRoutes";
import boardRouter from "./routes/boardRoutes";

// ========================== CONSTANTS ==================================

const DEFAULT_ROUTE = "/teamboards";

// ========================== EXPRESS CONFIG =============================

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================== DATABASE CONFIG ============================

const db = new DB();

// =========================== ROUTES =====================================

/**
 * Joins the given params to form a route
 * @param params
 */
const generateRoute = (...params: string[]) => {
  params.unshift(DEFAULT_ROUTE);
  return params.join("/");
};

// Route: /teamboards/project
app.use(generateRoute("project"), projectRouter(db));

// Route: /teamboards/board
app.use(generateRoute("board"), boardRouter(db));

// =========================== LISTENER ====================================

app.listen(1212, () => console.log("TEAMBOARDS SERVER RUNNING ON PORT 1212"));
