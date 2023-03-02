import { LoadFacebookUser } from '@/data/contracts'
import { FacebookAuthService } from '@/data/services'
import { AuthenticatorError } from '@/domain/errors'

class LoadFacebookUserSpy implements LoadFacebookUser {
    token?: string
    result = undefined

    async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Resolve> {
        this.token = params.token
        return this.result
    }
}

describe('FacebookAuthService', () => {
    it('should call LoadFacebookUser with correct params', async () => {
        const loadFacebookUser = new LoadFacebookUserSpy()
        const sut = new FacebookAuthService(loadFacebookUser)
        await sut.execute({ token: 'any_token' })
        expect(loadFacebookUser.token).toEqual('any_token')
    })

    it('should return AuthenticatiorError if LoadFacebookUser returns undefined', async () => {
        const loadFacebookUser = new LoadFacebookUserSpy()
        const sut = new FacebookAuthService(loadFacebookUser)
        const facebookApi = await sut.execute({ token: 'any_token' })
        expect(facebookApi).toEqual(new AuthenticatorError())
    })
})
