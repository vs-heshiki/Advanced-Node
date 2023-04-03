import { ForbiddenError } from '@/application/errors'
import { HttpResponse, forbidden } from '@/application/helpers'
import { RequiredInputValidator } from '@/application/validation/validators'
import { Authorize } from '@/domain/services'

describe('Authenticator Middleware', () => {
    let authorize: jest.Mock
    let sut: AuthenticatorMiddleware
    let authorization: string

    beforeAll(() => {
        authorize = jest.fn()
        authorization = 'any_authorization_token'
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
})

type HttpRequest = { authorization: string }

export class AuthenticatorMiddleware {
    constructor (private readonly authorize: Authorize) { }

    async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Error> | undefined> {
        const validate = new RequiredInputValidator(authorization, 'authorization').validate()
        if (validate !== undefined) return forbidden()
        try { await this.authorize({ token: authorization }) } catch { return forbidden() }
    }
}
