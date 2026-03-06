import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/appError"
import { StatusCode } from "../util/utilNumbers";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const isAppError = err instanceof AppError;
    const statusCode = isAppError ? err.statusCode: StatusCode.SERVER_ERROR;
    const message = isAppError
        ? err.message
        : "Erro interno do servidor";
    console.error({
        name: err.name,
        message: err.message,
        stack: err.stack
    });

    return res.status(statusCode).json({
        error: message
    })
}