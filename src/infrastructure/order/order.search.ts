import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function SearchOrderDb(productId: string) {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

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
        `,
        productId
    )

    await db.close();
    return data;
}

export async function SearchOrderDataDb() {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    const data = await db.all(`
        SELECT orderId FROM Orders;
        `)

    await db.close();
    return data;
}