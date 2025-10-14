import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";
import { AppError } from "@/utils/app-error";

export function errorHandler(error: any, request: Request, response: Response, _: NextFunction){
    if (error instanceof AppError ){
        return response.status(error.statusCode).json({message: error.message})
    }
    
    if (error instanceof ZodError ){
        return response.status(400).json({ message: "Validation error", issues: error.format() })
    }
    
    return response.status(500).json(error.message)
    
}