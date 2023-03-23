import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

type Params = HttpGetClient.Params
type Resolve = HttpGetClient.Resolve

export class AxiosHttpClient implements HttpGetClient {
    async get ({ url, params }: Params): Promise<Resolve> {
        const resolve = await axios.get(url, { params })
        return resolve.data
    }
}
