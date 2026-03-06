import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

export async function createDataBase() {
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database
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

        console.log(await db.get(`
            SELECT * FROM Orders
            `))
        console.log(await db.get(`
            SELECT * FROM Items
            `))
    } catch (error) {
        console.error(`Erro no Banco: ${error}`)
    }
}