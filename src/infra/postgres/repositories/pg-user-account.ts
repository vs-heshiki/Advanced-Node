import { PgUser } from '@/infra/postgres/entities'
import { LoadUserAccountRepository } from '@/data/contracts/repositories'

import { DataSource } from 'typeorm'

export class PgUserAccountRepository implements LoadUserAccountRepository {
    constructor (private readonly dataSource: DataSource) { }

    async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Resolve> {
        const pgUserAccount = this.dataSource.getRepository(PgUser)
        const pgUser = await pgUserAccount.findOne({ where: { email: params.email } })
        if (pgUser?.id !== undefined) {
            return {
                id: pgUser?.id.toString(),
                name: pgUser?.name ?? undefined
            }
        }
    }
}
