"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemDb = updateItemDb;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function updateItemDb(orderId, item) {
    const db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database
    });
    await db.run(`
        UPDATE Items
        SET 
            quantity = ?,
            price = ?
        WHERE 
            productId = ? AND
            orderId = ?;
        `, item.quantidadeItem, item.valorItem, item.idItem, orderId);
    await db.close();
}
