import { JwtTokenGenerator } from '@/infra/crypto'
import env from '@/main/config/env'

export const newJwtTokenGenerator = (): JwtTokenGenerator => {
    return new JwtTokenGenerator(env.JWT_SECRET)
}
