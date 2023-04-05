import { FacebookAuth, FacebookAuthSetup } from '@/domain/services'
import { AuthenticatorError } from '@/domain/entities/errors'
import { LoadUserAccount, SaveUserFacebook } from '@/domain/contracts/repositories'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { TokenGenerator, LoadFacebookUser } from '@/domain/contracts/gateways'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/facebook-account')

describe('FacebookAuth Service', () => {
    let facebookApi: MockProxy<LoadFacebookUser>
    let crypto: MockProxy<TokenGenerator>
    let userAccount: MockProxy<LoadUserAccount & SaveUserFacebook>
    let sut: FacebookAuthSetup
    const token = 'any_token'

    beforeAll(() => {
        facebookApi = mock()
        facebookApi.loadUser.mockResolvedValue({
            email: 'any_email@facebook.com',
            name: 'any_fb_name',
            facebookId: 'any_fb_id'
        })

        userAccount = mock()
        userAccount.load.mockResolvedValue(undefined)
        userAccount.saveWithFacebook.mockResolvedValue({ id: 'any_id' })

        crypto = mock()
        crypto.generator.mockResolvedValue('any_access_token')
    })

    beforeEach(() => {
        sut = FacebookAuth(
            facebookApi,
            userAccount,
            crypto
        )
    })

    it('should call LoadFacebookUser with correct params', async () => {
        await sut({ token })

        expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
        expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should throw AuthenticatorError if LoadFacebookUser returns undefined', async () => {
        facebookApi.loadUser.mockResolvedValueOnce(undefined)

        const result = sut({ token })

        await expect(result).rejects.toThrow(new AuthenticatorError())
    })

    it('should call userAccount if LoadFacebookUser returns data', async () => {
        await sut({ token })

        expect(userAccount.load).toHaveBeenCalledWith({ email: 'any_email@facebook.com' })
        expect(userAccount.load).toHaveBeenCalledTimes(1)
    })

    it('should call SaveUserFacebook with facebook account', async () => {
        const facebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        jest.mocked(FacebookAccount).mockImplementation(facebookAccountStub)

        await sut({ token })

        expect(userAccount.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
        expect(userAccount.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should call TokenGenerator with correct values', async () => {
        await sut({ token })

        expect(crypto.generator).toHaveBeenCalledWith({
            key: 'any_id',
            expiresInMs: AccessToken.expiresInMs
        })
        expect(crypto.generator).toHaveBeenCalledTimes(1)
    })

    it('should return a AccessToken on success', async () => {
        const accessToken = await sut({ token })

        expect(accessToken).toEqual({ accessToken: 'any_access_token' })
    })

    it('should throw if LoadFacebookUser throws', async () => {
        facebookApi.loadUser.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })

    it('should throw if LoadUserAccount throws', async () => {
        userAccount.load.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })

    it('should throw if SaveUserFacebook throws', async () => {
        userAccount.saveWithFacebook.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })

    it('should throw if TokenGenerator throws', async () => {
        crypto.generator.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })
})
