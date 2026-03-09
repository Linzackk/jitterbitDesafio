"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = NotFound;
const utilNumbers_1 = require("../util/utilNumbers");
const appError_1 = require("../model/appError");
function NotFound(req, res, next) {
    next(new appError_1.AppError("Rota não encontrada", utilNumbers_1.StatusCode.NOT_FOUND));
}
