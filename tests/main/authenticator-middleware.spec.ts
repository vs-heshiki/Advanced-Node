import env from '@/main/configs/env'
import { app } from '@/main/configs/app'
import { auth } from '@/main/middlewares'
import { ForbiddenError } from '@/application/errors'

import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('Authenticator Middleware', () => {
    it('should return 403 if no authorize header is provider', async () => {
        app.get('/fake_route', auth)

        const { statusCode, body } = await request(app).get('/fake_route')

        expect(statusCode).toBe(403)
        expect(body).toEqual({ error: new ForbiddenError().message })
    })

    it('should return 200 if authorize header valid is provider', async () => {
        const authorization = sign({ key: 'any_user_id' }, env.JWT_SECRET)
        app.get('/fake_route', auth, (req, res) => {
            res.json(req.locals)
        })

        const { statusCode, body } = await request(app)
            .get('/fake_route')
            .set({ authorization })

        expect(statusCode).toBe(200)
        expect(body).toEqual({ userId: 'any_user_id' })
    })
})
