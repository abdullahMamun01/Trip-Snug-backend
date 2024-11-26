import { NextFunction, Request, RequestHandler, Response } from "express";


export const catchAsync = (fn: RequestHandler) => {
    return async (req:Request ,res:Response , next:NextFunction) => {
        return Promise.resolve(fn(req,res,next)).catch(err => next(err))
    }
}