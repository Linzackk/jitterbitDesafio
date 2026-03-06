import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function deleteOrderDb(orderId: string) {
    const db = await open({
                    filename: './database.db',
                    driver: sqlite3.Database
            });

    await db.run(`
        DELETE FROM Orders
        WHERE orderId = ?
        `,
        orderId
    )

    await db.run(`
        DELETE FROM Items
        WHERE orderId = ?
        `,
        orderId
    )
}