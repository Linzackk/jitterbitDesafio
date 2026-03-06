import { Router } from "express";
import { validarCreateOrder, validarIdPedido } from "../middleware/order.middleware";
import { validarErrosMiddleware } from "../middleware/validarErros";
import { CriarPedido, ProcurarPedido, ProcurarTodosPedidos, DeletarPedido } from "../controller/order.controller";

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

router.delete(
    "/:id",
    validarIdPedido,
    validarErrosMiddleware,
    DeletarPedido
)

export default router;