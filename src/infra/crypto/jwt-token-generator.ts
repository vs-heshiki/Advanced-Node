import { TokenGenerator } from '@/data/contracts/crypto'

import jwt from 'jsonwebtoken'

export class JwtTokenGenerator {
    constructor (private readonly secret: string) { }
    async genToken (params: TokenGenerator.Params): Promise<void> {
        const expirationInSec = params.expiresInMs / 1000
        jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSec })
    }
}
