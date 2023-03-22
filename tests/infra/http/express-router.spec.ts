import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock } from 'jest-mock-extended'

describe('ExpressRouter', () => {
    it('should call handle with correct request', async () => {
        const controller = mock<Controller>()
        const req = getMockReq({ body: { any: 'any' } })
        const res = getMockRes().res
        const sut = new ExpressRouter(controller)

        await sut.adapt(req, res)

        expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    })
})

export class ExpressRouter {
    constructor (private readonly controller: Controller) { }

    async adapt (req: Request, res: Response): Promise<void> {
        await this.controller.handle({ ...req.body })
    }
}
