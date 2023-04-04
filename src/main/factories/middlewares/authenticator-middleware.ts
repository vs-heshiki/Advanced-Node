import { AuthenticatorMiddleware } from '@/application/middlewares'
import { AuthorizeSetup } from '@/domain/services'
import { JwtTokenHandler } from '@/infra/crypto'
import sensEnv from '@/main/configs/sens-env'

export const newAuthenticatorMiddleware = (): AuthenticatorMiddleware => {
    const authorize = AuthorizeSetup(new JwtTokenHandler(sensEnv.JWT_SECRET))
    return new AuthenticatorMiddleware(authorize)
}
