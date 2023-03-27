import { FacebookLoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredInputValidator } from '@/application/validation/validators'
import { AuthenticatorError } from '@/domain/services/errors'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

import { MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/application/validation/validator-composite')

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

    it('should build validators correctly', async () => {
        const validators = sut.validatorBuilder({ token })

        expect(validators).toEqual([
            new RequiredInputValidator('any_token', 'token')
        ])
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
})
