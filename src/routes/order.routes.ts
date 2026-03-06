import { Router } from "express";
import { validarCreateOrder } from "../middleware/order.middleware";
import { validarErrosMiddleware } from "../middleware/validarErros";
// importar middlewares

const router = Router();

router.post(
    "/",
    validarCreateOrder,
    validarErrosMiddleware,
    
)
export default router;