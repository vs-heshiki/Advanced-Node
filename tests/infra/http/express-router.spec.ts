import { Controller } from '@/application/controllers'
import { ExpressRouter } from '@/infra/http'

import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ExpressRouter', () => {
    let controller: MockProxy<Controller>
    let req: Request
    let res: Response
    let sut: ExpressRouter

    beforeEach(() => {
        req = getMockReq({ body: { any: 'any' } })
        res = getMockRes().res
        controller = mock()
        controller.handle.mockResolvedValue({
            statusCode: 200,
            data: {
                any: 'any_data'
            }
        })
        sut = new ExpressRouter(controller)
    })

    it('should call handle with correct request', async () => {
        await sut.adapt(req, res)

        expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
        expect(controller.handle).toHaveBeenCalledTimes(1)
    })

    it('should respond with 200 and correct data', async () => {
        await sut.adapt(req, res)

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

        await sut.adapt(req, res)

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

        await sut.adapt(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ error: ('adapt_error') })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})
