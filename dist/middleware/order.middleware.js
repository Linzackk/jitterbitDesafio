"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAtualizarPedido = exports.validarIdPedido = exports.validarCreateOrder = void 0;
const express_validator_1 = require("express-validator");
exports.validarCreateOrder = [
    (0, express_validator_1.body)("numeroPedido")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isString()
        .withMessage("Campo Obrigatório"),
    (0, express_validator_1.body)("valorTotal")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isFloat({ min: 0 })
        .withMessage("Campo precisa ser Real minimo 0."),
    (0, express_validator_1.body)("dataCriacao")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isISO8601()
        .withMessage("Campo precisa ser uma data."),
    (0, express_validator_1.body)("items")
        .notEmpty()
        .withMessage("Campo Obrigatório")
        .isArray()
        .withMessage("Campo precisa ser um array.")
];
exports.validarIdPedido = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Campo obrigatório.")
        .isString()
        .withMessage("Campo precisa ser string.")
];
exports.validarAtualizarPedido = [
    (0, express_validator_1.body)("valorTotal")
        .optional()
        .notEmpty()
        .withMessage("Campo não pode ser vazio")
        .isFloat({ min: 0 })
        .withMessage("Campo precisa ser Real minimo 0."),
    (0, express_validator_1.body)("items")
        .optional()
        .notEmpty()
        .withMessage("Campo não pode ser vazio")
        .isArray()
        .withMessage("Campo precisa ser um array.")
];
