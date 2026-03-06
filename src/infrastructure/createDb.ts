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
                productId INTEGER PRIMARY KEY,
                orderId VARCHAR(50) NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (orderId) REFERENCES Orders(orderId)
            )
        `)
    } catch (error) {
        console.error(`Erro no Banco: ${error}`)
    }
}