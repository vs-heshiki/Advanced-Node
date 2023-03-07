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
        sut = new JwtTokenGenerator(secret)
    })

    it('should call sign with correct params', async () => {
        await sut.genToken({ key, expiresInMs: 1000 })

        expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })
})
