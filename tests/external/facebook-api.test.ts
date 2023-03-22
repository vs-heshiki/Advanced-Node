import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import env from '@/main/config/env'

describe('FacebookApi Integration Tests', () => {
    it('should return undefined if token is invalid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID_TEST, env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: 'invalid' })

        expect(fbUser).toBeUndefined()
    })

    it('should a facebook user if token is valid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(axiosClient, env.CLIENT_ID_TEST, env.CLIENT_SECRET_TEST)

        const fbUser = await sut.loadUser({ token: 'EAANXtCmZARLsBAI65Ed6GpABk379T7zkVBmW3f2Mxz8jqZBFJ27gsfZCJ4rS9Y8q4KUCFJHf0QM3hxBAGq49MdZCilR3Axcrlf6Tm7C3TzAJm1GiPZBc574JE4PwZCEMTymedt64as4Jhj9kE11EiNMbegXdAvk0teG1c24HEa4cCHtDNLY5ViaLYWMmyb8vP5lZBRgZC3gULhpa7ZC9S8jLiucJNoPMRSA1rEDo1VjTM6RLWWkXrq2FZB7oElKr724F8ZD' })

        expect(fbUser).toEqual({
            name: 'Victor Seiji',
            email: 'victor_heshiki@hotmail.com',
            facebookId: '6078622875564070'
        })
    })
})
