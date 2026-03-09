"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarPedido = CriarPedido;
exports.ProcurarPedido = ProcurarPedido;
exports.ProcurarTodosPedidos = ProcurarTodosPedidos;
exports.DeletarPedido = DeletarPedido;
exports.atualizarPedidos = atualizarPedidos;
const utilNumbers_1 = require("../util/utilNumbers");
const order_services_1 = require("../service/order.services");
async function CriarPedido(req, res) {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;
    const createdOrder = await (0, order_services_1.createOrder)(numeroPedido, valorTotal, dataCriacao, items);
    res.status(utilNumbers_1.StatusCode.CREATED).json({
        message: createdOrder ? "Pedido criado com sucesso." : "Não foi possivel criar o Pedido."
    });
}
async function ProcurarPedido(req, res) {
    const { id } = req.params;
    const searchedOrder = await (0, order_services_1.searchOrder)(id);
    res.status(utilNumbers_1.StatusCode.OK).json({
        messge: "Pedido encontrado com sucesso.",
        data: { order: searchedOrder }
    });
}
async function ProcurarTodosPedidos(req, res) {
    const searchedOrders = await (0, order_services_1.searchAllOrder)();
    res.status(utilNumbers_1.StatusCode.OK).json({
        message: "Pedidos encontrados com sucesso.",
        data: { orders: searchedOrders }
    });
}
async function DeletarPedido(req, res) {
    const { id } = req.params;
    await (0, order_services_1.deleteOrder)(id);
    res.status(utilNumbers_1.StatusCode.OK).json({
        message: "Pedido deletado com sucesso."
    });
}
async function atualizarPedidos(req, res) {
    const { id } = req.params;
    const { items, valorTotal } = req.body;
    const data = await (0, order_services_1.atualizarPedido)(id, valorTotal, items);
    res.status(utilNumbers_1.StatusCode.OK).json({
        message: "Pedido atualizado com sucesso.",
    });
}
