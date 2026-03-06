import { Router } from "express";
import { validarCreateOrder, validarProcurarOrder } from "../middleware/order.middleware";
import { validarErrosMiddleware } from "../middleware/validarErros";
import { CriarPedido, ProcurarPedido } from "../controller/order.controller";

const router = Router();

router.post(
    "/",
    validarCreateOrder,
    validarErrosMiddleware,
    CriarPedido,
)

router.get(
    "/:id",
    validarProcurarOrder,
    validarErrosMiddleware,
    ProcurarPedido
)

export default router;