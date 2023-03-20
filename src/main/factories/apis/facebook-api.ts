import env from '@/main/config/env'
import { FacebookApi } from '@/infra/apis'
import { newAxiosHttpClient } from '@/main/factories/gateways'

export const newFacebookApi = (): FacebookApi => {
    return new FacebookApi(newAxiosHttpClient(), env.CLIENT_ID, env.CLIENT_SECRET)
}
