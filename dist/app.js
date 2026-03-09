"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/order", order_routes_1.default);
app.use(notFound_1.NotFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
