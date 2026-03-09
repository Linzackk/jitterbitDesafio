"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItemDb = searchItemDb;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function searchItemDb(orderId, itemId) {
    const db = await (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database
    });
    const data = await db.get(`
        SELECT * FROM Items 
        WHERE
            productId = ? AND 
            orderId = ?;
    `, itemId, orderId);
    await db.close();
    return data;
}
