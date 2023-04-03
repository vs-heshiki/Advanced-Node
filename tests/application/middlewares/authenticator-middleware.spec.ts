import { ForbiddenError } from '@/application/errors'
import { AuthenticatorMiddleware } from '@/application/middlewares'

describe('Authenticator Middleware', () => {
    let authorize: jest.Mock
    let sut: AuthenticatorMiddleware
    let authorization: string

    beforeAll(() => {
        authorization = 'any_authorization_token'
        authorize = jest.fn().mockResolvedValue('any_user_id')
    })

    beforeEach(() => {
        sut = new AuthenticatorMiddleware(authorize)
    })

    it('should return 403 if authorization is empty', async () => {
        const response = await sut.handle({ authorization: '' })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })

    it('should return 403 if authorization is null', async () => {
        const response = await sut.handle({ authorization: null as any })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })

    it('should return 403 if authorization is undefined', async () => {
        const response = await sut.handle({ authorization: undefined as any })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })

    it('should return 403 if authorization is undefined', async () => {
        const response = await sut.handle({ authorization: undefined as any })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })

    it('should call Authorize with correct input', async () => {
        await sut.handle({ authorization })

        expect(authorize).toHaveBeenCalledWith({ token: authorization })
        expect(authorize).toHaveBeenCalledTimes(1)
    })

    it('should return 403 if authorize throws', async () => {
        authorize.mockRejectedValueOnce(new Error('any_error'))

        const response = await sut.handle({ authorization })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })

    it('should return 200 and user id on success', async () => {
        const authToken = await sut.handle({ authorization })

        expect(authToken).toEqual({
            statusCode: 200,
            data: { userId: 'any_user_id' }
        })
    })
})
