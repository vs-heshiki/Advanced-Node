import { AuthenticatorMiddleware } from '@/application/middlewares'
import { newJwtTokenHandler } from '@/main/factories/gateways'

export const newAuthenticatorMiddleware = (): AuthenticatorMiddleware => {
    const jwt = newJwtTokenHandler()
    return new AuthenticatorMiddleware(jwt.validate.bind(jwt))
}
