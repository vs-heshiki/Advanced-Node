import { FacebookLoginController } from '@/application/controllers'
import { FacebookAuth } from '@/domain/features'

import { MockProxy, mock } from 'jest-mock-extended'

describe('FacebookAuthController', () => {
    let facebookAuth: MockProxy<FacebookAuth>
    let sut: FacebookLoginController

    beforeAll(() => {
        facebookAuth = mock()
    })

    beforeEach(() => {
        sut = new FacebookLoginController(facebookAuth)
    })

    it('should return 400 if token is empty', async () => {
        const httpResponse = await sut.handle({ token: '' })

        expect(httpResponse).toEqual({
            statusCode: 400,
            data: new Error('Token is required!')
        })
    })

    it('should return 400 if token is null', async () => {
        const httpResponse = await sut.handle({ token: null })

        expect(httpResponse).toEqual({
            statusCode: 400,
            data: new Error('Token is required!')
        })
    })

    it('should return 400 if token is undefined', async () => {
        const httpResponse = await sut.handle({ token: undefined })

        expect(httpResponse).toEqual({
            statusCode: 400,
            data: new Error('Token is required!')
        })
    })

    it('should call FacebookAuth with correct params', async () => {
        await sut.handle({ token: 'any_token' })

        expect(facebookAuth.execute).toHaveBeenCalledWith({ token: 'any_token' })
    })
})
