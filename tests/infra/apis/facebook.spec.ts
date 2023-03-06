import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/http'

import { MockProxy, mock } from 'jest-mock-extended'

describe('FacebookApi', () => {
    let httpClient: MockProxy<HttpGetClient>
    let sut: FacebookApi

    beforeEach(() => {
        httpClient = mock()
        sut = new FacebookApi(httpClient)
    })

    it('should get app token', async () => {
        await sut.loadUser({ token: 'any_token' })

        expect(httpClient.get).toHaveBeenCalledWith({ url: 'https://graph.facebook.com/oauth/access_token' })
    })
})
