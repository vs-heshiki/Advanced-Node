import { LoadFacebookUser } from '@/data/contracts/apis'
import { CreateUserFacebookRepository, LoadUserAccountRepository, UpdateUserFacebookRepository } from '@/data/contracts/repositories'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthService', () => {
    let facebookApi: MockProxy<LoadFacebookUser>
    let userAccountRepository: MockProxy<LoadUserAccountRepository & CreateUserFacebookRepository & UpdateUserFacebookRepository>
    let sut: FacebookAuthService
    const token = 'any_token'

    beforeEach(() => {
        facebookApi = mock()
        facebookApi.loadUser.mockResolvedValue({
            email: 'any_email@mail.com',
            name: 'any_fb_name',
            facebookId: 'any_fb_id'
        })
        userAccountRepository = mock()

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

        expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' })
        expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
    })

    it('should call CreateUserFacebookRepository if UserAccountRepository returns undefined', async () => {
        userAccountRepository.load.mockResolvedValue(undefined)

        await sut.execute({ token })

        expect(userAccountRepository.createWithFacebook).toHaveBeenCalledWith({
            email: 'any_email@mail.com',
            name: 'any_fb_name',
            facebookId: 'any_fb_id'
        })
        expect(userAccountRepository.createWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should call UpdateUserFacebookRepository if UserAccountRepository returns data', async () => {
        userAccountRepository.load.mockResolvedValue({
            id: 'any_id',
            name: 'any_name'
        })

        await sut.execute({ token })

        expect(userAccountRepository.updateWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_name',
            facebookId: 'any_fb_id'
        })
        expect(userAccountRepository.updateWithFacebook).toHaveBeenCalledTimes(1)
    })
})
