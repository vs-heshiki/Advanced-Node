import { AxiosHttpClient } from '@/infra/http/axios-client'

export const newAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}
