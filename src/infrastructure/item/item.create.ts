import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Item } from "../../model/item";

export async function CreateItemDb(numeroPedido: string, item: Item) {
    const db = await open({
                filename: './database.db',
                driver: sqlite3.Database
        });

    await db.run(`
        INSERT INTO Items 
            (productId, orderId, quantity, price) 
        VALUES (?, ?, ?, ?)
        `,
        item.idItem,
        numeroPedido,
        item.quantidadeItem,
        item.valorItem
    )
    await db.close();
}