import { LoadFacebookUser } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/data/contracts/repositories'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { FacebookAccount } from '@/domain/models'
import { TokenGenerator } from '@/data/contracts/crypto'

jest.mock('@/domain/models/facebook-account')

describe('FacebookAuthService', () => {
    let facebookApi: MockProxy<LoadFacebookUser>
    let crypto: MockProxy<TokenGenerator>
    let userAccountRepository: MockProxy<LoadUserAccountRepository & SaveUserFacebookRepository>
    let sut: FacebookAuthService
    const token = 'any_token'

    beforeEach(() => {
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

        sut = new FacebookAuthService(
            facebookApi,
            userAccountRepository,
            crypto
        )
    })

    it('should call LoadFacebookUser with correct params', async () => {
        await sut.execute({ token })

        expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
        expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticatiorError if LoadFacebookUser returns undefined', async () => {
        const facebookApi = await sut.execute({ token })

        expect(facebookApi).toEqual(new AuthenticatorError())
    })

    it('should call UserAccountRepository if LoadFacebookUser returns data', async () => {
        await sut.execute({ token })

        expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email@facebook.com' })
        expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
    })

    it('should call SaveUserFacebookRepository with facebook account', async () => {
        const facebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        jest.mocked(FacebookAccount).mockImplementation(facebookAccountStub)

        await sut.execute({ token })

        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should call TokenGenerator with correct value', async () => {
        await sut.execute({ token })

        expect(crypto.genToken).toHaveBeenCalledWith({ key: 'any_id' })
        expect(crypto.genToken).toHaveBeenCalledTimes(1)
    })
})
