import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function searchItemDb(orderId: string, itemId: number) {
    const db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        });

    const data = await db.get(`
        SELECT * FROM Items 
        WHERE
            productId = ? AND 
            orderId = ?;
    `,
    itemId,
    orderId
    )

    await db.close();
    return data;
}