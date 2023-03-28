import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
    it('should expiration in 1800000ms', () => {
        expect(AccessToken.expiresInMs).toBe(1800000)
    })
})
