import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Item } from "../../model/item";

export async function deleteItemDb(orderId: string, item: Item) {
     const db = await open({
                filename: './database.db',
                driver: sqlite3.Database
        });

    await db.run(`
        DELETE FROM Items
        WHERE
            productId = ? AND
            orderId = ?;
    `,
    item.productId,
    orderId
    )
}