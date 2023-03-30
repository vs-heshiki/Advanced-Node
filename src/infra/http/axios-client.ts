import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

type Input = HttpGetClient.Input
type Output = HttpGetClient.Output

export class AxiosHttpClient implements HttpGetClient {
    async get ({ url, params }: Input): Promise<Output> {
        const resolve = await axios.get(url, { params })
        return resolve.data
    }
}
