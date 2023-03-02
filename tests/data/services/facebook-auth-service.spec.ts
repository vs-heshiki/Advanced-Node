import { LoadFacebookUser } from '@/data/contracts'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

class LoadFacebookUserSpy implements LoadFacebookUser {
    token?: string
    result = undefined
    callsCount = 0

    async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Resolve> {
        this.token = params.token
        this.callsCount++
        return this.result
    }
}

describe('FacebookAuthService', () => {
    it('should call LoadFacebookUser with correct params', async () => {
        const loadFacebookUser = new LoadFacebookUserSpy()
        const sut = new FacebookAuthService(loadFacebookUser)
        await sut.execute({ token: 'any_token' })
        expect(loadFacebookUser.token).toEqual('any_token')
        expect(loadFacebookUser.callsCount).toBe(1)
    })

    it('should return AuthenticatiorError if LoadFacebookUser returns undefined', async () => {
        const loadFacebookUser = new LoadFacebookUserSpy()
        const sut = new FacebookAuthService(loadFacebookUser)
        const facebookApi = await sut.execute({ token: 'any_token' })
        expect(facebookApi).toEqual(new AuthenticatorError())
    })
})
