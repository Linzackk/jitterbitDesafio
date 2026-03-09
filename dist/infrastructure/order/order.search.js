"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOrderDb = SearchOrderDb;
exports.SearchOrderDataDb = SearchOrderDataDb;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function SearchOrderDb(orderId) {
    const db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database
    });
    const order = await db.all(`
        SELECT * FROM Orders
        WHERE orderId = ?
        `, orderId);
    if (order.length === 0)
        return false;
    const data = await db.all(`
        SELECT 
            o.orderId,
            o.value,
            o.creationDate,
            i.idItem,
            i.productId,
            i.quantity,
            i.price
        FROM Orders o
        INNER JOIN Items i
            ON o.orderId = i.orderId
        WHERE o.orderId = ?
        `, orderId);
    await db.close();
    return data;
}
async function SearchOrderDataDb() {
    const db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database
    });
    const data = await db.all(`
        SELECT orderId FROM Orders;
        `);
    await db.close();
    return data;
}
