/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Controller } from '@/application/controllers'
import { adaptExpressRouter } from '@/main/adapters'

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ExpressRouter', () => {
    let req: Request
    let res: Response
    let next: NextFunction
    let controller: MockProxy<Controller>
    let sut: RequestHandler

    beforeAll(() => {
        req = getMockReq({ body: { any: 'any' } })
        res = getMockRes().res
        next = getMockRes().next
        controller = mock()
        controller.handle.mockResolvedValue({
            statusCode: 200,
            data: {
                any: 'any_data'
            }
        })
    })

    beforeEach(() => {
        sut = adaptExpressRouter(controller)
    })

    it('should call handle with correct request', async () => {
        await sut(req, res, next)

        expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
        expect(controller.handle).toHaveBeenCalledTimes(1)
    })

    it('should respond with 200 and correct data', async () => {
        await sut(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ any: 'any_data' })
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should respond with 400 and correct error', async () => {
        controller.handle.mockResolvedValueOnce({
            statusCode: 400,
            data: new Error('any_error')
        })

        await sut(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ error: ('any_error') })
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should respond with 500 and correct error', async () => {
        controller.handle.mockResolvedValueOnce({
            statusCode: 500,
            data: new Error('adapt_error')
        })

        await sut(req, res, next)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ error: ('adapt_error') })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})
