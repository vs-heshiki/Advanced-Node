import { AxiosHttpClient } from '@/infra/http'

export const newAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}
