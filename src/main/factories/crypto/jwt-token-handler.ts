import { JwtTokenHandler } from '@/infra/crypto'
import sensEnv from '@/main/configs/sens-env'

export const newJwtTokenHandler = (): JwtTokenHandler => {
    return new JwtTokenHandler(sensEnv.JWT_SECRET)
}
