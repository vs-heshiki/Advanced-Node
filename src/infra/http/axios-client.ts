import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

type Params = HttpGetClient.Params
type Resolve = HttpGetClient.Resolve

export class AxiosHttpClient implements HttpGetClient {
    async get ({ params, url }: Params): Promise<Resolve> {
        return await axios.get(url, { params })
    }
}
