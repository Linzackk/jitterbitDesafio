import { CreateItemDb } from "../infrastructure/item/item.create";
import { CreateOrderDb } from "../infrastructure/order/order.create";
import { Item } from "../model/item";

export async function createOrder(
    numeroPedido: string, 
    valorTotal: number, 
    dataCriacao: string, 
    items: 
    Item[]
) {
    const createdOrder = await CreateOrderDb(numeroPedido, valorTotal, dataCriacao);
    items.forEach(item => {
        CreateItemDb(numeroPedido, item);
    });
    
    return true;
}