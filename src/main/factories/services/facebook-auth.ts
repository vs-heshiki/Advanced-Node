import { FacebookAuth, FacebookAuthSetup } from '@/domain/services'
import { newFacebookApi, newJwtTokenHandler } from '@/main/factories/gateways'
import { newPguserAccount } from '@/main/factories/postgres/pg-user'

export const newFacebookAuth = (): FacebookAuthSetup => {
    return FacebookAuth(newFacebookApi(), newPguserAccount(), newJwtTokenHandler())
}
