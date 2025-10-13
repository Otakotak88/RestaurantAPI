import { Request, Response, NextFunction } from "express"

import { AppError } from "@/utils/app-error";

export function errorHandler(error: any, request: Request, response: Response, _: NextFunction){
    if (error instanceof AppError ){
        return response.status(error.statusCode).json({message: error.message})
    }
    else{
        return response.status(400).json(error.message)
    }
}