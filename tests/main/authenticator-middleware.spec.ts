import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/configs/app'
import { auth } from '@/main/middlewares'

import request from 'supertest'

describe('Authenticator Middleware', () => {
    it('should return 403 if no authorize header is provider', async () => {
        app.get('/fake_route', auth)

        const { statusCode, body } = await request(app).get('/fake_route')

        expect(statusCode).toBe(403)
        expect(body).toEqual({ error: new ForbiddenError().message })
    })
})
