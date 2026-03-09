"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.searchOrder = searchOrder;
exports.searchAllOrder = searchAllOrder;
exports.deleteOrder = deleteOrder;
exports.atualizarPedido = atualizarPedido;
const item_create_1 = require("../infrastructure/item/item.create");
const item_delete_1 = require("../infrastructure/item/item.delete");
const item_search_1 = require("../infrastructure/item/item.search");
const item_update_1 = require("../infrastructure/item/item.update");
const order_create_1 = require("../infrastructure/order/order.create");
const order_delete_1 = require("../infrastructure/order/order.delete");
const order_search_1 = require("../infrastructure/order/order.search");
const order_update_1 = require("../infrastructure/order/order.update");
const appError_1 = require("../model/appError");
const utilNumbers_1 = require("../util/utilNumbers");
async function createOrder(numeroPedido, valorTotal, dataCriacao, items) {
    try {
        await (0, order_create_1.CreateOrderDb)(numeroPedido, valorTotal, dataCriacao);
        await criarItensDoPedido(numeroPedido, items);
        return true;
    }
    catch (error) {
        throw new appError_1.AppError(`Pedido com ID ${numeroPedido} já foi cadastrado.`, utilNumbers_1.StatusCode.BAD_REQUEST);
    }
}
async function searchOrder(idPedido) {
    try {
        const searchedOrder = await (0, order_search_1.SearchOrderDb)(idPedido);
        if (!searchedOrder)
            throw new appError_1.AppError("Pedido não encontrado.", utilNumbers_1.StatusCode.NOT_FOUND);
        const formatedOrder = formatarLeituraPedido(searchedOrder);
        return formatedOrder;
    }
    catch (error) {
        throw new appError_1.AppError(error.message, utilNumbers_1.StatusCode.SERVER_ERROR);
    }
}
async function searchAllOrder() {
    try {
        const orders = await (0, order_search_1.SearchOrderDataDb)();
        const dataResponse = await Promise.all(orders.map(order => searchOrder(order.orderId)));
        return dataResponse;
    }
    catch (error) {
        throw new appError_1.AppError(error.message, utilNumbers_1.StatusCode.SERVER_ERROR);
    }
}
async function deleteOrder(orderId) {
    try {
        await (0, order_delete_1.deleteOrderDb)(orderId);
    }
    catch (error) {
        throw new appError_1.AppError(error.message, utilNumbers_1.StatusCode.SERVER_ERROR);
    }
}
function formatarLeituraPedido(searchedOrder) {
    return {
        orderId: searchedOrder[0].orderId,
        value: searchedOrder[0].value,
        creationDate: searchedOrder[0].creationDate,
        items: searchedOrder.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
}
async function atualizarPedido(orderId, valorTotal, items) {
    try {
        if (valorTotal) {
            await (0, order_update_1.updateOrderDb)(orderId, valorTotal);
        }
        if (!items)
            return;
        const orderItems = await (0, order_search_1.SearchOrderDb)(orderId);
        if (!orderItems)
            throw new appError_1.AppError("Pedido não encontrado.", utilNumbers_1.StatusCode.NOT_FOUND);
        const iguais = items.filter(i => orderItems.some(b => b.productId === i.idItem));
        const diferentes = orderItems.filter(i => !items.some(b => b.idItem === i.productId));
        if (iguais.length > 0)
            atualizarItensDoPedido(orderId, iguais);
        if (diferentes.length > 0)
            criarItensDoPedido(orderId, diferentes);
    }
    catch (error) {
        throw new appError_1.AppError(error.message, utilNumbers_1.StatusCode.SERVER_ERROR);
    }
}
async function atualizarItensDoPedido(orderId, items) {
    for (const item of items) {
        const data = await (0, item_search_1.searchItemDb)(orderId, parseInt(item.idItem));
        if (data) {
            (0, item_update_1.updateItemDb)(orderId, item);
        }
        else {
            (0, item_create_1.CreateItemDb)(orderId, item);
        }
    }
}
async function criarItensDoPedido(orderId, items) {
    for (const item of items) {
        const data = await (0, item_search_1.searchItemDb)(orderId, item.productId);
        if (data)
            (0, item_delete_1.deleteItemDb)(orderId, item);
    }
}
