"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const createDb_1 = require("./infrastructure/createDb");
const PORTA = 3000;
app_1.default.listen(PORTA, async () => {
    await (0, createDb_1.createDataBase)();
    console.log(`Servidor rodando em: http://localhost:${PORTA}`);
});
