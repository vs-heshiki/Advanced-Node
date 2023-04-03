import { Middleware } from '@/application/controllers'
import { RequestHandler } from 'express'

type Setup = (middleware: Middleware) => RequestHandler

export const adapterExpressMiddleware: Setup = middleware => async (req, res, next) => {
    const { statusCode, data } = await middleware.handle({ ...req.headers })
    if (statusCode === 200) {
        const entries = Object.entries(data).filter(entry => entry[1])
        req.locals = { ...req.locals, ...Object.fromEntries(entries) }
        next()
    }
    res.status(statusCode).json(data)
}
