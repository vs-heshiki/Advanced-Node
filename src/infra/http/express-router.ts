import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Setup = (controller: Controller) => RequestHandler

export const adaptExpressRouter: Setup = controller => async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    const json = statusCode === 200 ? data : { error: data.message }
    res.status(statusCode).json(json)
}
