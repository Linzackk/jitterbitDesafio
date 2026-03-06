import express from "express";
import orderService from "./routes/order.routes";
import { errorHandler } from "./middleware/errorHandler";
import { NotFound } from "./middleware/notFound";

const app = express();

app.use(express.json());

app.use("/order", orderService);

app.use(NotFound);

app.use(errorHandler);

export default app;