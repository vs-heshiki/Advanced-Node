import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http/axios-client'
import env from '@/main/config/env'

describe('FacebookApi Integration Tests', () => {
    it('should return undefined if token is invalid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID, env.CLIENT_SECRET)

        const fbUser = await sut.loadUser({ token: 'invalid' })

        expect(fbUser).toBeUndefined()
    })

    it('should a facebook user if token is valid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID, env.CLIENT_SECRET)

        const fbUser = await sut.loadUser({ token: 'EAANXtCmZARLsBAGbFYiDPaBmL9ygP1EPNOjiUfFjulLqjiwkyWHaRcZAdxU61z0D91yeHWehNRSNjTmvoncsjzIflVy45ZBnSVIQFsbRoTJclD3EPfjiRJaS2bBaUop97D0n9mWzbPQ7wP2ATNYJZB9vetlPRQhXZCZBJYJtxqGF9ioklCKs1wmxdkDKfiPHtwmi8yK6XJBJSlrqixwx0dlVHAVjnPN8ETlI1pLYVEAZCoRwrmt64jfvmNlmr9HYVYZD' })

        expect(fbUser).toEqual({
            name: 'Victor Seiji',
            email: 'victor_heshiki@hotmail.com',
            facebookId: '6078622875564070'
        })
    })
})
