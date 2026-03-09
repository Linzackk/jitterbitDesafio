import { CreateItemDb } from "../infrastructure/item/item.create";
import { deleteItemDb } from "../infrastructure/item/item.delete";
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
        await atualizarItensDoPedido(numeroPedido, items)
        return true;
    } catch (error: any) {
        throw new AppError(`Pedido com ID ${numeroPedido} já foi cadastrado.`, StatusCode.BAD_REQUEST)
    }
}

export async function searchOrder(idPedido: string) {
    try {
        const searchedOrder = await SearchOrderDb(idPedido);
        if (!searchedOrder)
            throw new AppError("Pedido não encontrado.", StatusCode.NOT_FOUND)
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
    try {
        if (valorTotal) {
            await updateOrderDb(orderId, valorTotal)
        }

        if (!items) 
            return;

        const orderItems = await SearchOrderDb(orderId);

        if (!orderItems)
            throw new AppError("Pedido não encontrado.", StatusCode.NOT_FOUND)

        const iguais = items.filter(i => 
            orderItems.some(b => b.productId === i.idItem)
        )

        const diferentes = items.filter(i => 
        !orderItems.some(b => b.productId === i.idItem)
    )
        console.log(diferentes)
        console.log(iguais)
        
        if (iguais.length > 0)
            atualizarItensDoPedido(orderId, iguais);

        if (diferentes.length > 0)
            deletarItensDoPedido(orderId, diferentes);

    } catch (error: any) {
        throw new AppError(error.message, StatusCode.SERVER_ERROR);
    }
}

async function atualizarItensDoPedido(orderId: string, items: Item[]) {
    for (const item of items) {
        const data = await searchItemDb(orderId, parseInt(item.idItem))
        
        if (data) {
            updateItemDb(orderId, item);
        }
    }
}

async function deletarItensDoPedido(orderId: string, items: Item[]) {
    for (const item of items) {
        const data = await searchItemDb(orderId, item.productId)
        if (data)
            deleteItemDb(orderId, item);
        else 
            CreateItemDb(orderId, item);
    }
}
