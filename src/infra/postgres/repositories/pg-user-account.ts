import { PgUser } from '@/infra/postgres/entities'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/data/contracts/repositories'

import { DataSource } from 'typeorm'

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveUserFacebookRepository {
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

    async saveWithFacebook (params: SaveUserFacebookRepository.Params): Promise<SaveUserFacebookRepository.Resolve> {
        const pgUserAccount = this.dataSource.getRepository(PgUser)
        let id: string
        if (params.id === undefined) {
            const pgUser = await pgUserAccount.save({
                email: params.email,
                name: params.name,
                facebookId: params.facebookId
            })
            id = pgUser.id.toString()
        } else {
            id = params.id
            await pgUserAccount.update({
                id: parseInt(params.id)
            }, {
                name: params.name,
                facebookId: params.facebookId
            })
        }
        return { id }
    }
}
