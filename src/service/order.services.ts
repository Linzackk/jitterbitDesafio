import { CreateItemDb } from "../infrastructure/item/item.create";
import { CreateOrderDb } from "../infrastructure/order/order.create";
import { SearchOrderDb } from "../infrastructure/order/order.search";
import { Item } from "../model/item";

export async function createOrder(
    numeroPedido: string, 
    valorTotal: number, 
    dataCriacao: string, 
    items: 
    Item[]
) {
    try {   
        await CreateOrderDb(numeroPedido, valorTotal, dataCriacao);
        items.forEach(item => {
            CreateItemDb(numeroPedido, item);
        });
        return true;
    } catch (error: any) {
        // lançar erro global
        return false;
    }
}

export async function searchOrder(idPedido: string) {
    try {
        const searchedOrder = await SearchOrderDb(idPedido);
        return searchedOrder;
    } catch (error: any) {
        // lançar erro global
    }

}