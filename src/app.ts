import express from "express";
import orderService from "./routes/order.routes";

const app = express();

app.use(express.json());

app.use("/order", orderService);

export default app;