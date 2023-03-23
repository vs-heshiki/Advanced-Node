import sensitive_env from '@/main/config/sens-env'
import { FacebookApi } from '@/infra/apis'
import { newAxiosHttpClient } from '@/main/factories/gateways'

export const newFacebookApi = (): FacebookApi => {
    return new FacebookApi(newAxiosHttpClient(), sensitive_env.CLIENT_ID, sensitive_env.CLIENT_SECRET)
}
