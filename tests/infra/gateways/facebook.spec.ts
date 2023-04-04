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
        httpClient.get
            .mockResolvedValueOnce({ access_token: 'any_app_token' })
            .mockResolvedValueOnce({ data: { user_id: 'any_user_id' } })
            .mockResolvedValueOnce({
                name: 'any_fb_name',
                email: 'any_fb_email',
                id: 'any_fb_id'
            })
        sut = new FacebookApi(httpClient, clientId, clientSecret)
    })

    it('should get app token', async () => {
        await sut.loadUser({ token: 'any_client_token' })

        expect(httpClient.get).toHaveBeenCalledWith({
            url: 'https://graph.facebook.com/v16.0/oauth/access_token',
            params: {
                client_id: 'any_client_id',
                client_secret: 'any_client_secret',
                grant_type: 'client_credentials'
            }
        })
    })

    it('should get debug token', async () => {
        await sut.loadUser({ token: 'any_client_token' })

        expect(httpClient.get).toHaveBeenCalledWith({
            url: 'https://graph.facebook.com/v16.0/debug_token',
            params: {
                access_token: 'any_app_token',
                input_token: 'any_client_token'
            }
        })
    })

    it('should get user info', async () => {
        await sut.loadUser({ token: 'any_client_token' })

        expect(httpClient.get).toHaveBeenCalledWith({
            url: 'https://graph.facebook.com/v16.0/any_user_id',
            params: {
                fields: 'id,name,email',
                access_token: 'any_client_token'
            }
        })
    })

    it('should get facebook user', async () => {
        const facebookUser = await sut.loadUser({ token: 'any_client_token' })

        expect(facebookUser).toEqual({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id'
        })
    })

    it('should return undefined if HttpGetClient throws', async () => {
        httpClient.get.mockReset().mockRejectedValueOnce(new Error('facebook_error'))

        const facebookUser = await sut.loadUser({ token: 'any_client_token' })

        expect(facebookUser).toBeUndefined()
    })
})
