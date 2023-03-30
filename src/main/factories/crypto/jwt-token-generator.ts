import { JwtTokenHandler } from '@/infra/crypto'
import env from '@/main/configs/env'

export const newJwtTokenGenerator = (): JwtTokenHandler => {
    return new JwtTokenHandler(env.JWT_SECRET)
}
