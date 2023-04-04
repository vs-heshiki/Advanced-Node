import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import { JwtPayload, sign, verify } from 'jsonwebtoken'

type InputGen = TokenGenerator.Input
type OutputGen = TokenGenerator.Output
type InputValid = TokenValidator.Input
type OutputValid = TokenValidator.Output

export class JwtTokenHandler implements TokenGenerator {
    constructor (private readonly secret: string) { }

    async generator ({ expiresInMs, key }: InputGen): Promise<OutputGen> {
        const expirationInSec = expiresInMs / 1000
        return sign({ key }, this.secret, { expiresIn: expirationInSec })
    }

    async validate ({ token }: InputValid): Promise<OutputValid> {
        const payload = verify(token, this.secret) as JwtPayload
        return payload.key
    }
}
