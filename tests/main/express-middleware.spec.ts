/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Middleware } from '@/application/controllers'
import { adapterExpressMiddleware as adapt } from '@/main/adapters'

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
        middleware.handle.mockResolvedValue({
            statusCode: 200,
            data: {
                emptyProp: '',
                nullProp: null,
                undefinedProp: undefined,
                prop: 'any_data'
            }
        })
    })

    beforeEach(() => {
        sut = adapt(middleware)
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

    it('should respond with correct statusCode and error', async () => {
        middleware.handle.mockResolvedValueOnce({
            statusCode: 500,
            data: { error: 'any_error' }
        })

        await sut(req, res, next)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should add valid data to req.locals', async () => {
        await sut(req, res, next)

        expect(req.locals).toEqual({ prop: 'any_data' })
        expect(next).toHaveBeenCalledTimes(1)
    })
})
