import { FacebookAuth, FacebookAuthSetup } from '@/domain/services'
import { newFacebookApi } from '@/main/factories/apis'
import { newJwtTokenHandler } from '@/main/factories/crypto'
import { newPgUserAccountRepository } from '@/main/factories/postgres/pg-user'

export const newFacebookAuth = (): FacebookAuth => {
    return FacebookAuthSetup(newFacebookApi(), newPgUserAccountRepository(), newJwtTokenHandler())
}
