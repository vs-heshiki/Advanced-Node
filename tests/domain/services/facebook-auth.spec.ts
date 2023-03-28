import { FacebookAuth, FacebookAuthSetup } from '@/domain/services'
import { AuthenticatorError } from '@/domain/entities/errors'
import { LoadFacebookUser } from '@/domain/contracts/apis'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/domain/contracts/repositories'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { TokenGenerator } from '@/domain/contracts/crypto'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/facebook-account')

describe('FacebookAuth Service', () => {
    let facebookApi: MockProxy<LoadFacebookUser>
    let crypto: MockProxy<TokenGenerator>
    let userAccountRepository: MockProxy<LoadUserAccountRepository & SaveUserFacebookRepository>
    let sut: FacebookAuth
    const token = 'any_token'

    beforeAll(() => {
        facebookApi = mock()
        facebookApi.loadUser.mockResolvedValue({
            email: 'any_email@facebook.com',
            name: 'any_fb_name',
            facebookId: 'any_fb_id'
        })

        userAccountRepository = mock()
        userAccountRepository.load.mockResolvedValue(undefined)
        userAccountRepository.saveWithFacebook.mockResolvedValue({ id: 'any_id' })

        crypto = mock()
        crypto.genToken.mockResolvedValue('any_access_token')
    })

    beforeEach(() => {
        sut = FacebookAuthSetup(
            facebookApi,
            userAccountRepository,
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

    it('should call UserAccountRepository if LoadFacebookUser returns data', async () => {
        await sut({ token })

        expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email@facebook.com' })
        expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
    })

    it('should call SaveUserFacebookRepository with facebook account', async () => {
        const facebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        jest.mocked(FacebookAccount).mockImplementation(facebookAccountStub)

        await sut({ token })

        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should call TokenGenerator with correct values', async () => {
        await sut({ token })

        expect(crypto.genToken).toHaveBeenCalledWith({
            key: 'any_id',
            expiresInMs: AccessToken.expiresInMs
        })
        expect(crypto.genToken).toHaveBeenCalledTimes(1)
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

    it('should throw if LoadUserAccountRepository throws', async () => {
        userAccountRepository.load.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })

    it('should throw if SaveUserFacebookRepository throws', async () => {
        userAccountRepository.saveWithFacebook.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })

    it('should throw if TokenGenerator throws', async () => {
        crypto.genToken.mockRejectedValueOnce(new Error('server error'))

        const result = sut({ token })

        await expect(result).rejects.toThrow(new Error('server error'))
    })
})
