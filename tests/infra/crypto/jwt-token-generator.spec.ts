import { JwtTokenGenerator } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtGeneratorToken', () => {
    let fakeJwt: jest.Mocked<typeof jwt>
    let sut: JwtTokenGenerator
    const key: string = 'any_key'
    const secret: string = 'any_secret'

    beforeAll(() => {
        fakeJwt = jwt as jest.Mocked<typeof jwt>
    })

    beforeEach(() => {
        fakeJwt.sign.mockImplementation(() => 'any_token')
        sut = new JwtTokenGenerator(secret)
    })

    it('should call sign with correct params', async () => {
        await sut.genToken({ key, expiresInMs: 1000 })

        expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })

    it('should return a token on success', async () => {
        const token = await sut.genToken({ key, expiresInMs: 1000 })

        expect(token).toBe('any_token')
    })

    it('should throw if sign throws', async () => {
        fakeJwt.sign.mockImplementationOnce(() => { throw new Error('jwt_error') })

        const token = sut.genToken({ key, expiresInMs: 1000 })

        await expect(token).rejects.toThrow(new Error('jwt_error'))
    })
})
