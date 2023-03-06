import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/http'

import { MockProxy, mock } from 'jest-mock-extended'

describe('FacebookApi', () => {
    const clientId = 'any_client_id'
    const clientSecret = 'any_client_secret'
    let httpClient: MockProxy<HttpGetClient>
    let sut: FacebookApi

    beforeAll(() => {
        httpClient = mock()
    })

    beforeEach(() => {
        httpClient.get.mockResolvedValueOnce({ accessToken: 'any_app_token' })
        sut = new FacebookApi(httpClient, clientId, clientSecret)
    })

    it('should get app token', async () => {
        await sut.loadUser({ token: 'any_token' })

        expect(httpClient.get).toHaveBeenCalledWith({
            url: 'https://graph.facebook.com/oauth/access_token',
            params: {
                clientId: 'any_client_id',
                clientSecret: 'any_client_secret',
                grantType: 'client_credentials'
            }
        })
    })

    it('should get debug token', async () => {
        await sut.loadUser({ token: 'any_token' })

        expect(httpClient.get).toHaveBeenCalledWith({
            url: 'https://graph.facebook.com/debug_token',
            params: {
                accessToken: 'any_app_token',
                inputToken: 'any_token'
            }
        })
    })
})
