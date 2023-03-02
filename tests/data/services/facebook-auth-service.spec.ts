import { LoadFacebookUser } from '@/data/contracts'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('FacebookAuthService', () => {
    it('should call LoadFacebookUser with correct params', async () => {
        const loadFacebookUser = mock<LoadFacebookUser>()
        const sut = new FacebookAuthService(loadFacebookUser)

        await sut.execute({ token: 'any_token' })

        expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
        expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticatiorError if LoadFacebookUser returns undefined', async () => {
        const loadFacebookUser = mock<LoadFacebookUser>()
        const sut = new FacebookAuthService(loadFacebookUser)

        const facebookApi = await sut.execute({ token: 'any_token' })

        expect(facebookApi).toEqual(new AuthenticatorError())
    })
})
