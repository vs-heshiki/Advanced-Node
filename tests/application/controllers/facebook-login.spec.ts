import { FacebookLoginController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredInputValidator } from '@/application/validator'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

import { MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/application/validator/required-input')

describe('FacebookAuthController', () => {
    let facebookAuth: MockProxy<FacebookAuth>
    let sut: FacebookLoginController
    let token: string

    beforeAll(() => {
        token = 'any_token'
        facebookAuth = mock()
        facebookAuth.execute.mockResolvedValue(new AccessToken('any_key'))
    })

    beforeEach(() => {
        sut = new FacebookLoginController(facebookAuth)
    })

    it('should return 400 if validation fails', async () => {
        const error = new Error('validation_error')
        const RequiredInputValidatorSpy = jest.fn().mockImplementationOnce(() => ({
            validate: jest.fn().mockReturnValueOnce(error)
        }))

        jest.mocked(RequiredInputValidator).mockImplementationOnce(RequiredInputValidatorSpy)

        const httpResponse = await sut.handle({ token })

        expect(RequiredInputValidator).toHaveBeenCalledWith('any_token', 'token')
        expect(httpResponse).toEqual({
            statusCode: 400,
            data: error
        })
    })

    it('should call FacebookAuth with correct params', async () => {
        await sut.handle({ token })

        expect(facebookAuth.execute).toHaveBeenCalledWith({ token })
    })

    it('should return 401 if authenticator fails', async () => {
        facebookAuth.execute.mockResolvedValueOnce(new AuthenticatorError())

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
            data: {
                accessToken: 'any_key'
            }
        })
    })

    it('should return 500 if authenticator throws', async () => {
        facebookAuth.execute.mockRejectedValueOnce(new Error('server error'))

        const httpResponse = await sut.handle({ token })

        expect(httpResponse).toEqual({
            statusCode: 500,
            data: new ServerError(new Error('server error'))
        })
    })
})
