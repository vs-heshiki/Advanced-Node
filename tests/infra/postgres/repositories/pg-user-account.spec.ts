import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repositories'
import { makeFakeDb } from '@/../tests/infra/postgres/repositories/db-connection'

import { DataSource, Repository } from 'typeorm'

describe('PgUserAccountRepository', () => {
    describe('Load', () => {
        let pgUserRepo: Repository<PgUser>
        let dataSource: DataSource
        let sut: PgUserAccountRepository

        beforeEach(async () => {
            const fakeDb = await makeFakeDb([PgUser])

            dataSource = fakeDb.dataSource
            pgUserRepo = dataSource.getRepository(PgUser)
            sut = new PgUserAccountRepository(dataSource)
        })

        it('should call load with email and return an account', async () => {
            await pgUserRepo.save({ email: 'existing_email@mail.com' })

            const account = await sut.load({ email: 'existing_email@mail.com' })

            expect(account).toEqual({ id: '1' })

            await dataSource.destroy()
        })

        it('should call load with email and return undefined if email not exists', async () => {
            const account = await sut.load({ email: 'undefined_email' })

            expect(account).toBeUndefined()

            await dataSource.destroy()
        })
    })
})
