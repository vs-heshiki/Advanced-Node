import { JwtTokenHandler } from '@/infra/crypto'
import env from '@/main/configs/env'

export const newJwtTokenHandler = (): JwtTokenHandler => {
    return new JwtTokenHandler(env.JWT_SECRET)
}
