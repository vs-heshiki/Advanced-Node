import { LoadFacebookUser } from '@/data/contracts/apis'
import { CreateUserAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repositories'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthService', () => {
    let loadFacebookUser: MockProxy<LoadFacebookUser>
    let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>
    let createUserAccountRepository: MockProxy<CreateUserAccountRepository>
    let sut: FacebookAuthService
    const token = 'any_token'

    beforeEach(() => {
        loadFacebookUser = mock()
        loadFacebookUser.loadUser.mockResolvedValue({
            email: 'any_email@mail.com',
            name: 'any_name',
            facebookId: 'any_id'
        })
        createUserAccountRepository = mock()
        loadUserAccountRepository = mock()
        sut = new FacebookAuthService(
            loadFacebookUser,
            loadUserAccountRepository,
            createUserAccountRepository
        )
    })

    it('should call LoadFacebookUser with correct params', async () => {
        await sut.execute({ token })

        expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token })
        expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticatiorError if LoadFacebookUser returns undefined', async () => {
        const facebookApi = await sut.execute({ token })

        expect(facebookApi).toEqual(new AuthenticatorError())
    })

    it('should call LoadUserAccountRepository if LoadFacebookUser returns data', async () => {
        await sut.execute({ token })

        expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email@mail.com' })
        expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1)
    })

    it('should call CreateUserAccountRepository if LoadUserAccountRepository returns undefined', async () => {
        loadUserAccountRepository.load.mockResolvedValue(undefined)

        await sut.execute({ token })

        expect(createUserAccountRepository.createFromFacebook).toHaveBeenCalledWith({
            email: 'any_email@mail.com',
            name: 'any_name',
            facebookId: 'any_id'
        })
        expect(createUserAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
    })
})
