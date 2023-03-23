import { AxiosHttpClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
    let mockAxios: jest.Mocked<typeof axios>
    let sut: AxiosHttpClient
    let url: string
    let params: object

    beforeAll(() => {
        url = 'any_url'
        params = { any: 'any' }
        mockAxios = axios as jest.Mocked<typeof axios>
        mockAxios.get.mockResolvedValue({ data: 'any_data', status: 200 })
    })

    beforeEach(() => {
        sut = new AxiosHttpClient()
    })

    it('should call get with correct params', async () => {
        await sut.get({ url, params })

        expect(mockAxios.get).toHaveBeenCalledWith('any_url', { params: { any: 'any' } })
    })

    it('should return data on success', async () => {
        const data = await sut.get({ url, params })

        expect(data).toEqual('any_data')
    })

    it('should throw if axios.GET throws', async () => {
        mockAxios.get.mockRejectedValueOnce(new Error('axios_error'))

        const promise = sut.get({ url, params })

        await expect(promise).rejects.toThrow(new Error('axios_error'))
    })
})
