import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'

import { sign, verify } from 'jsonwebtoken'

type InputGen = TokenGenerator.Input
type OutputGen = TokenGenerator.Output
type InputValid = TokenValidator.Input

export class JwtTokenHandler implements TokenGenerator {
    constructor (private readonly secret: string) { }

    async generator ({ expiresInMs, key }: InputGen): Promise<OutputGen> {
        const expirationInSec = expiresInMs / 1000
        return sign({ key }, this.secret, { expiresIn: expirationInSec })
    }

    async validate ({ token }: InputValid): Promise<void> {
        verify(token, this.secret)
    }
}
