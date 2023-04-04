import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import env from '@/main/configs/env'

describe('FacebookApi Integration Tests', () => {
    it('should return undefined if token is invalid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID_TEST, env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: 'invalid' })

        expect(fbUser).toBeUndefined()
    })
    // test failing below to hide sensitive data!
    it('should a facebook user if token is valid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID_TEST, env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: env.CLIENT_TOKEN_TEST })

        expect(fbUser).toEqual({
            name: 'Any Name',
            email: 'any_any@anymail.com',
            facebookId: '00000000000000000000'
        })
    })
})
