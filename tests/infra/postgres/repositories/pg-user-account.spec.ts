import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repositories'

import { makeFakeDb } from '@/tests/infra/postgres/repositories/db-connection'

import { DataSource, Repository } from 'typeorm'
import { IBackup } from 'pg-mem'

describe('PgUserAccountRepository', () => {
    let pgUserRepo: Repository<PgUser>
    let dataSource: DataSource
    let sut: PgUserAccountRepository
    let backup: IBackup

    beforeAll(async () => {
        const fakeDb = await makeFakeDb([PgUser])

        dataSource = fakeDb.dataSource
        pgUserRepo = dataSource.getRepository(PgUser)
        backup = fakeDb.db.backup()
    })

    beforeEach(() => {
        backup.restore()
        sut = new PgUserAccountRepository(dataSource)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    describe('Load', () => {
        it('should call load with email and return an account', async () => {
            await pgUserRepo.save({ email: 'existing_email@mail.com' })

            const account = await sut.load({ email: 'existing_email@mail.com' })

            expect(account).toEqual({ id: '1' })
        })

        it('should call load with email and return undefined if email not exists', async () => {
            const account = await sut.load({ email: 'undefined_email' })

            expect(account).toBeUndefined()
        })
    })
})
