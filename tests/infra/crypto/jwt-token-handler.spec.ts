import { JwtTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
    let fakeJwt: jest.Mocked<typeof jwt>
    let sut: JwtTokenHandler

    beforeAll(() => {
        fakeJwt = jwt as jest.Mocked<typeof jwt>
    })

    describe('TokenGenerator', () => {
        const key: string = 'any_key'
        const secret: string = 'any_secret'
        const token: string = 'any_token'
        const expiresInMs: number = 1000

        beforeEach(() => {
            fakeJwt.sign.mockImplementation(() => token)
            sut = new JwtTokenHandler(secret)
        })

        it('should call sign with correct params', async () => {
            await sut.generator({ key, expiresInMs })

            expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
            expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
        })

        it('should return a token on success', async () => {
            const token = await sut.generator({ key, expiresInMs })

            expect(token).toBe(token)
        })

        it('should throw if sign throws', async () => {
            fakeJwt.sign.mockImplementationOnce(() => { throw new Error('jwt_error') })

            const token = sut.generator({ key, expiresInMs })

            await expect(token).rejects.toThrow(new Error('jwt_error'))
        })
    })

    describe('TokenValidator', () => {
        const secret: string = 'any_secret'
        const token: string = 'any_token'

        beforeEach(() => {
            fakeJwt.verify.mockImplementation(() => token)
            sut = new JwtTokenHandler(secret)
        })

        it('should call verify with correct params', async () => {
            await sut.validate({ token })

            expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
            expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
        })
    })
})
