import { Request, Response } from "express";
import { StatusCode } from "../util/utilNumbers";
import { createOrder, searchAllOrder, searchOrder } from "../service/order.services";

export async function CriarPedido(
    req: Request,
    res: Response
) {
    const {numeroPedido, valorTotal, dataCriacao, items} = req.body;

    const createdOrder = await createOrder(numeroPedido, valorTotal, dataCriacao, items);
    res.status(StatusCode.OK).json({
        message:  createdOrder ? "Pedido criado com sucesso." : "Não foi possivel criar o Pedido."
    })
}

export async function ProcurarPedido (
    req: Request,
    res: Response
) {
    const {id} = req.params

    const searchedOrder = await searchOrder(id as string);
    res.status(StatusCode.OK).json({
        messge: "Pedido encontrado com sucesso.",
        data: {order: searchedOrder}
    });
}

export async function ProcurarTodosPedidos (
    req: Request,
    res: Response
) {
    const searchedOrders = await searchAllOrder();
    res.status(StatusCode.OK).json({
        message: "Pedidos encontrados com sucesso.",
        data: {orders: searchedOrders}
    })
}
