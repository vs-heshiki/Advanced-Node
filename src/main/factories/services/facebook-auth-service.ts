import { FacebookAuthService } from '@/data/services'
import { newFacebookApi } from '@/main/factories/apis'
import { newJwtTokenGenerator } from '@/main/factories/crypto'
import { newPgUserAccountRepository } from '@/main/factories/postgres/pg-user'

export const newFacebookAuthService = (): FacebookAuthService => {
    return new FacebookAuthService(newFacebookApi(), newPgUserAccountRepository(), newJwtTokenGenerator())
}
