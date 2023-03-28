import { FacebookLoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredInputValidator } from '@/application/validation/validators'
import { AuthenticatorError } from '@/domain/entities/errors'

jest.mock('@/application/validation/validator-composite')

describe('FacebookAuthController', () => {
    let facebookAuth: jest.Mock
    let sut: FacebookLoginController
    let token: string

    beforeAll(() => {
        token = 'any_token'
        facebookAuth = jest.fn()
        facebookAuth.mockResolvedValue({ accessToken: 'any_key' })
    })

    beforeEach(() => {
        sut = new FacebookLoginController(facebookAuth)
    })

    it('should build validators correctly', async () => {
        const validators = sut.validatorBuilder({ token })

        expect(validators).toEqual([
            new RequiredInputValidator('any_token', 'token')
        ])
    })

    it('should call FacebookAuth with correct params', async () => {
        await sut.handle({ token })

        expect(facebookAuth).toHaveBeenCalledWith({ token })
    })

    it('should return 401 if authenticator fails', async () => {
        facebookAuth.mockRejectedValueOnce(new AuthenticatorError())

        const httpResponse = await sut.handle({ token })

        expect(httpResponse).toEqual({
            statusCode: 401,
            data: new UnauthorizedError()
        })
    })

    it('should return 200 if authenticator succeds', async () => {
        const httpResponse = await sut.handle({ token })

        expect(httpResponse).toEqual({
            statusCode: 200,
            data: { accessToken: 'any_key' }
        })
    })
})
