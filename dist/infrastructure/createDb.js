"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = createDataBase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function createDataBase() {
    try {
        const db = await (0, sqlite_1.open)({
            filename: './database.db',
            driver: sqlite3_1.default.Database
        });
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Orders (
                orderId VARCHAR(50) PRIMARY KEY,
                value REAL NOT NULL,
                creationDate TEXT NOT NULL
            );
        `);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Items (
                idItem INTEGER PRIMARY KEY AUTOINCREMENT,
                productId INTEGER NOT NULL,
                orderId VARCHAR(50) NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (orderId) REFERENCES Orders(orderId)
            );
        `);
    }
    catch (error) {
        console.error(`Erro no Banco: ${error}`);
    }
}
