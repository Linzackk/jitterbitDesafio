import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function CreateOrderDb(numeroPedido: string, valorTotal: number, dataCriacao: string) {
    const db = await open({
                filename: './database.db',
                driver: sqlite3.Database
        });

    await db.run(`
        INSERT INTO Orders 
            (orderId, value, creationDate) 
        VALUES (?, ?, ?);
        `,
        numeroPedido,
        valorTotal,
        dataCriacao
    )
    await db.close();
}