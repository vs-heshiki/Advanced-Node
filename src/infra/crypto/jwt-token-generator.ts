import { TokenGenerator } from '@/domain/contracts/crypto'

import { sign } from 'jsonwebtoken'

type Input = TokenGenerator.Input
type Output = TokenGenerator.Output

export class JwtTokenGenerator implements TokenGenerator {
    constructor (private readonly secret: string) { }
    async genToken ({ expiresInMs, key }: Input): Promise<Output> {
        const expirationInSec = expiresInMs / 1000
        return sign({ key }, this.secret, { expiresIn: expirationInSec })
    }
}
