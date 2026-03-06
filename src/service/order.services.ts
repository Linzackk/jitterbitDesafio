import { CreateItemDb } from "../infrastructure/item/item.create";
import { CreateOrderDb } from "../infrastructure/order/order.create";
import { SearchOrderDataDb, SearchOrderDb } from "../infrastructure/order/order.search";
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
        for (const item of items) {
            await CreateItemDb(numeroPedido, item)
        }
        return true;
    } catch (error: any) {
        // lançar erro global
        return false;
    }
}

export async function searchOrder(idPedido: string) {
    try {
        const searchedOrder = await SearchOrderDb(idPedido);
        const formatedOrder = formatarLeituraPedido(searchedOrder)
        return formatedOrder;
        
    } catch (error: any) {
        console.log("ERRO: ", error.message)
    }

}

export async function searchAllOrder() {
    try {
        const orders = await SearchOrderDataDb();

        const dataResponse = await Promise.all(
            orders.map(order => searchOrder(order.orderId))
        );

        return dataResponse
        
    } catch (error: any) {

    }
}

function formatarLeituraPedido(searchedOrder: any[]) {
    return {
        orderId: searchedOrder[0].orderId,
        value: searchedOrder[0].value,
        creationDate: searchedOrder[0].creationDate,
        items: searchedOrder.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
}
