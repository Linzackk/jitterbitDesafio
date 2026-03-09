import { Router } from "express";
import { validarAtualizarPedido, validarCreateOrder, validarIdPedido } from "../middleware/order.middleware";
import { validarErrosMiddleware } from "../middleware/validarErros";
import { CriarPedido, ProcurarPedido, ProcurarTodosPedidos, DeletarPedido, atualizarPedidos } from "../controller/order.controller";

const router = Router();

router.post(
    "/",
    validarCreateOrder,
    validarErrosMiddleware,
    CriarPedido,
)

router.get(
    "/:id",
    validarIdPedido,
    validarErrosMiddleware,
    ProcurarPedido
)

router.get(
    "/",
    ProcurarTodosPedidos
)

router.put(
    "/:id",
    validarIdPedido,
    validarAtualizarPedido,
    validarErrosMiddleware,
    atualizarPedidos,
)

router.delete(
    "/:id",
    validarIdPedido,
    validarErrosMiddleware,
    DeletarPedido
)

export default router;