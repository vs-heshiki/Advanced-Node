import { LoadFacebookUser } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/data/contracts/repositories'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthService', () => {
    let facebookApi: MockProxy<LoadFacebookUser>
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

        sut = new FacebookAuthService(
            facebookApi,
            userAccountRepository
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

    it('should create an account with facebook', async () => {
        await sut.execute({ token })

        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({
            email: 'any_email@facebook.com',
            name: 'any_fb_name',
            facebookId: 'any_fb_id'
        })
        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should update an account with facebook if name exists', async () => {
        userAccountRepository.load.mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_name'
        })

        await sut.execute({ token })

        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_name',
            facebookId: 'any_fb_id',
            email: 'any_email@facebook.com'
        })
        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should update an account with facebook if name not exists', async () => {
        userAccountRepository.load.mockResolvedValueOnce({
            id: 'any_id'
        })

        await sut.execute({ token })

        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_fb_name',
            facebookId: 'any_fb_id',
            email: 'any_email@facebook.com'
        })
        expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
    })
})
