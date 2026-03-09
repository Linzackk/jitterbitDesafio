import { body, param } from "express-validator";

export const validarCreateOrder = [
    body("numeroPedido")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isString()
        .withMessage("Campo Obrigatório"),

    body("valorTotal")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isFloat({ min: 0})
        .withMessage("Campo precisa ser Real minimo 0."),

    body("dataCriacao")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isISO8601()
        .withMessage("Campo precisa ser uma data."),
    
    body("items")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isArray()
        .withMessage("Campo precisa ser um array.")
]

export const validarIdPedido = [
    param("id")
        .notEmpty()
        .withMessage("Campo obrigatório.")
        .isString()
        .withMessage("Campo precisa ser string.")
]

export const validarAtualizarPedido = [
    body("valorTotal")
        .optional()
        .notEmpty()
        .withMessage("Campo não pode ser vazio")
        .isFloat({min: 0})
        .withMessage("Campo precisa ser Real minimo 0."),

    body("items")
        .optional()
        .notEmpty()
        .withMessage("Campo não pode ser vazio")
        .isArray()
        .withMessage("Campo precisa ser um array.")
]