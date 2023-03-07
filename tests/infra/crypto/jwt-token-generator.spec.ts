import { JwtTokenGenerator } from '@/infra/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtGeneratorToken', () => {
    it('should call sign with correct params', async () => {
        const fakeJwt = jwt as jest.Mocked<typeof jwt>
        const sut = new JwtTokenGenerator('any_secret')

        await sut.genToken({ key: 'any_key', expiresInMs: 1000 })

        expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: 1 })
    })
})
