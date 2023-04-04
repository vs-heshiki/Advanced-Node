import { adapterExpressMiddleware } from '@/main/adapters'
import { newAuthenticatorMiddleware } from '@/main/factories/middlewares'

export const auth = adapterExpressMiddleware(newAuthenticatorMiddleware())
