import { Router } from "express";
import { validarCreateOrder } from "../middleware/order.middleware";
import { validarErrosMiddleware } from "../middleware/validarErros";
import { CriarPedido } from "../controller/order.controller";
// importar middlewares

const router = Router();

router.post(
    "/",
    validarCreateOrder,
    validarErrosMiddleware,
    CriarPedido,
)
export default router;