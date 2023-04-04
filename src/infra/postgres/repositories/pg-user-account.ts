import { PgUser } from '@/infra/postgres/entities'
import { LoadUserAccount, SaveUserFacebook } from '@/domain/contracts/repositories'

import { DataSource } from 'typeorm'

type LoadParams = LoadUserAccount.Input
type LoadResolve = LoadUserAccount.Output
type SaveParams = SaveUserFacebook.Input
type SaveResolve = SaveUserFacebook.Output

export class PguserAccount implements LoadUserAccount, SaveUserFacebook {
    constructor (private readonly dataSource: DataSource) { }

    async load ({ email }: LoadParams): Promise<LoadResolve> {
        const pgUserAccount = this.dataSource.getRepository(PgUser)
        const pgUser = await pgUserAccount.findOne({ where: { email } })
        if (pgUser?.id !== undefined) {
            return {
                id: pgUser?.id.toString(),
                name: pgUser?.name ?? undefined
            }
        }
    }

    async saveWithFacebook ({ email, name, facebookId, id }: SaveParams): Promise<SaveResolve> {
        const pgUserAccount = this.dataSource.getRepository(PgUser)
        let resultId: string
        if (id === undefined) {
            const pgUser = await pgUserAccount.save({ email, name, facebookId })
            resultId = pgUser.id.toString()
        } else {
            resultId = id
            await pgUserAccount.update({ id: parseInt(id) }, { name, facebookId })
        }
        return { id: resultId }
    }
}
