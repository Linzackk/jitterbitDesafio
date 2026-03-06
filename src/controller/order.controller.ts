import { Request, Response } from "express";
import { StatusCode } from "../util/utilNumbers";
import { createOrder } from "../service/order.services";

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
