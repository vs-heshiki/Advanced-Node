import { TokenGenerator } from '@/domain/contracts/crypto'

import { sign } from 'jsonwebtoken'

type Params = TokenGenerator.Params
type Resolve = TokenGenerator.Resolve

export class JwtTokenGenerator implements TokenGenerator {
    constructor (private readonly secret: string) { }
    async genToken ({ expiresInMs, key }: Params): Promise<Resolve> {
        const expirationInSec = expiresInMs / 1000
        return sign({ key }, this.secret, { expiresIn: expirationInSec })
    }
}
