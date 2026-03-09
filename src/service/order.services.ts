import { CreateItemDb } from "../infrastructure/item/item.create";
import { searchItemDb } from "../infrastructure/item/item.search";
import { updateItemDb } from "../infrastructure/item/item.update";
import { CreateOrderDb } from "../infrastructure/order/order.create";
import { deleteOrderDb } from "../infrastructure/order/order.delete";
import { SearchOrderDataDb, SearchOrderDb } from "../infrastructure/order/order.search";
import { updateOrderDb } from "../infrastructure/order/order.update";
import { AppError } from "../model/appError";
import { Item } from "../model/item";
import { StatusCode } from "../util/utilNumbers";

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
        throw new AppError(`Pedido com ID ${numeroPedido} já foi cadastrado.`, StatusCode.BAD_REQUEST)
    }
}

export async function searchOrder(idPedido: string) {
    try {
        const searchedOrder = await SearchOrderDb(idPedido);
        const formatedOrder = formatarLeituraPedido(searchedOrder)
        return formatedOrder;
        
    } catch (error: any) {
        throw new AppError(error.message, StatusCode.SERVER_ERROR);
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
        throw new AppError(error.message, StatusCode.SERVER_ERROR);
    }
}

export async function deleteOrder(orderId: string) {
    try {
        await deleteOrderDb(orderId);
    } catch (error: any) {
        throw new AppError(error.message, StatusCode.SERVER_ERROR);
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

export async function atualizarPedido(orderId: string, valorTotal: number, items: Item[]) {
    if (valorTotal) {
        await updateOrderDb(orderId, valorTotal)
    }

    if (!items) 
        return;
    
    for (const item of items) {
        const data = await searchItemDb(orderId, parseInt(items[0].idItem))
        if (data) {
            updateItemDb(orderId, item);
        }
        else {
            CreateItemDb(orderId, item);
        }
    }
}
