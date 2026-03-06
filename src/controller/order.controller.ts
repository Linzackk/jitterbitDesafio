import { Request, Response } from "express";
import { StatusCode } from "../util/utilNumbers";

export async function CriarPedido(
    req: Request,
    res: Response
) {
    const {numeroPedido, valorTotal, dataCriacao, items} = req.body;

    const createdOrder = await createOrder(numeroPedido, valorTotal, dataCriacao, items);
    res.status(StatusCode.OK).json({
        message: "Pedido criado com sucesso.",
        data: {order: createdOrder}
    })
}
