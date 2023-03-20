import { PgUserAccountRepository } from '@/infra/postgres/repositories'
import { dataSource } from '@/infra/typeorm'

export const newPgUserAccountRepository = (): PgUserAccountRepository => {
    return new PgUserAccountRepository(dataSource)
}
