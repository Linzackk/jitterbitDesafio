import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Item } from "../../model/item";

export async function updateItemDb(orderId: string, item: Item) {
    const db = await open({
                filename: './database.db',
                driver: sqlite3.Database
        });

    await db.run(`
        UPDATE Items
        SET 
            quantity = ?,
            price = ?
        WHERE 
            productId = ? AND
            orderId = ?;
        `,
        item.quantidadeItem,
        item.valorItem,
        item.idItem,
        orderId
    )

    await db.close();
}