import { ForbiddenError } from '@/application/errors'
import { HttpResponse, forbidden } from '@/application/helpers'

describe('Authenticator Middleware', () => {
    let sut: AuthenticatorMiddleware

    beforeEach(() => {
        sut = new AuthenticatorMiddleware()
    })

    it('should return 403 if authorization is empty', async () => {
        const response = await sut.handle({ authorization: '' })

        expect(response).toEqual({
            statusCode: 403,
            data: new ForbiddenError()
        })
    })
})

type HttpRequest = { authorization: string }

export class AuthenticatorMiddleware {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse<Error>> {
        return forbidden()
    }
}
