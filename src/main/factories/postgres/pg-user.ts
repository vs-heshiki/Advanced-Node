import { PguserAccount } from '@/infra/postgres/repositories'
import { dataSource } from '@/infra/typeorm'

export const newPguserAccount = (): PguserAccount => {
    return new PguserAccount(dataSource)
}
