import { Item } from "../model/item";

export async function createOrder(
    numeroPedido: string, 
    valorTotal: number, 
    dataCriacao: Date, 
    items: 
    Item[]
) {
    const createdOrder = await CreateOrderDb(numeroPedido, valorTotal, dataCriacao);
    items.forEach(item => {
        CreateItemDb(numeroPedido, item);
    });
    
    return createdOrder;
}