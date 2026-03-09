import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function updateOrderDb(orderId: string, valorTotal: number) {
    const db = await open({
                filename: './database.db',
                driver: sqlite3.Database
        });

    await db.run(`
        UPDATE Orders
        SET 
            value = ?
        WHERE 
            orderId = ?
        `,
        valorTotal,
        orderId
    )

    await db.close();
}