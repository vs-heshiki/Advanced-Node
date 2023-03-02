import { LoadFacebookUser } from '@/data/contracts'
import { FacebookAuthService } from '@/data/services'

class LoadFacebookUserSpy implements LoadFacebookUser {
    token?: string

    async loadUser (params: LoadFacebookUser.Params): Promise<void> {
        this.token = params.token
    }
}

describe('FacebookAuthService', () => {
    it('should call LoadFacebookUser with correct params', async () => {
        const loadFacebookUser = new LoadFacebookUserSpy()
        const sut = new FacebookAuthService(loadFacebookUser)
        await sut.execute({ token: 'any_token' })
        expect(loadFacebookUser.token).toEqual('any_token')
    })
})
