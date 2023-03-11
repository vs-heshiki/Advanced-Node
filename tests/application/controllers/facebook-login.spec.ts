import { FacebookAuthController } from '@/application/controllers'

describe('FacebookAuthController', () => {
    let sut: FacebookAuthController

    beforeEach(() => {
        sut = new FacebookAuthController()
    })

    it('should return 400 if token is empty', async () => {
        const httpResponse = await sut.handle({ token: '' })

        expect(httpResponse).toEqual({
            statusCode: 400,
            data: new Error('Token is required!')
        })
    })
})
