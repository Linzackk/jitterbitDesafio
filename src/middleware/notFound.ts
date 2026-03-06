import { NextFunction } from "express";
import { StatusCode } from "../util/utilNumbers";
import { AppError } from "../model/appError";

export function NotFound(
    req: Request,
    res: Response,
    next: NextFunction
) {
    next(new AppError("Rota não encontrada", StatusCode.NOT_FOUND));
}