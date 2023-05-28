import { Request, Response, NextFunction } from 'express'

export const wrapAsync = (func: any, status_code: number = 500) => {
    const wrapped = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next)
        } catch (err: any) {
            res.status(status_code).json(err.message)
        }
    }
    return wrapped
}

export const wrapNonAsync = (func: any, status_code: number = 500) => {
    const wrapped = (req: Request, res: Response, next: NextFunction) => {
        try {
            func(req, res, next)
        } catch (err: any) {
            res.status(status_code).json(err.message)
        }
    }
    return wrapped
}