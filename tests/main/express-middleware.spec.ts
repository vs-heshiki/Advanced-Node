/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { HttpResponse } from '@/application/helpers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ExpressMiddleware', () => {
    let sut: RequestHandler
    let req: Request
    let res: Response
    let next: NextFunction
    let middleware: MockProxy<Middleware>

    beforeAll(() => {
        req = getMockReq({ headers: { any: 'any' } })
        res = getMockRes().res
        next = getMockRes().next
        middleware = mock()
    })

    beforeEach(() => {
        sut = adapterExpressMiddleware(middleware)
    })

    it('should call handle with correct request', async () => {
        await sut(req, res, next)

        expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' })
        expect(middleware.handle).toHaveBeenCalledTimes(1)
    })

    it('should call handle with empty request', async () => {
        req = getMockReq({})

        await sut(req, res, next)

        expect(middleware.handle).toHaveBeenCalledWith({})
        expect(middleware.handle).toHaveBeenCalledTimes(1)
    })
})

interface Middleware {
    handle: (httpRequest: any) => HttpResponse
}

type Setup = (middleware: Middleware) => RequestHandler

const adapterExpressMiddleware: Setup = middleware => async (req, res, next) => {
    await middleware.handle({ ...req.headers })
}
