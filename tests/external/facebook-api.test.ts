import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import sensive_env from '@/main/config/sens-env'

describe('FacebookApi Integration Tests', () => {
    it('should return undefined if token is invalid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, sensive_env.CLIENT_ID_TEST, sensive_env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: 'invalid' })

        expect(fbUser).toBeUndefined()
    })

    it('should a facebook user if token is valid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, sensive_env.CLIENT_ID_TEST, sensive_env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: sensive_env.CLIENT_TOKEN_TEST })

        expect(fbUser).toEqual({
            name: 'Victor Seiji',
            email: 'victor_heshiki@hotmail.com',
            facebookId: '6092294080863616'
        })
    })
})
