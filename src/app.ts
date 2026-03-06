import express from "express";
import orderService from "./routes/order.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/order", orderService);

app.use(notFound);

app.use(errorHandler);

export default app;