"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarErrosMiddleware = validarErrosMiddleware;
const express_validator_1 = require("express-validator");
const utilNumbers_1 = require("../util/utilNumbers");
function validarErrosMiddleware(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsResponse = errors.array().map(error => {
            const fieldError = error;
            return {
                field: fieldError.path,
                message: fieldError.msg,
            };
        });
        return res.status(utilNumbers_1.StatusCode.BAD_REQUEST).json({
            errors: errorsResponse,
        });
    }
    next();
}
