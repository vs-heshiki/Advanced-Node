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

    describe('SaveWithFacebook', () => {
        it('should create an account if id is undefined', async () => {
            const { id } = await sut.saveWithFacebook({
                email: 'any_email@mail.com',
                name: 'any_name',
                facebookId: 'any_fb_id'
            })

            const account = await pgUserRepo.findOne({ where: { email: 'any_email@mail.com' } })

            expect(account?.id).toBe(1)
            expect(id).toBe('1')
        })

        it('should update an account if id exists', async () => {
            await pgUserRepo.save({
                email: 'any_email@mail.com',
                name: 'any_name'
            })

            const { id } = await sut.saveWithFacebook({
                id: '1',
                email: 'any_fb_email@mail.com',
                name: 'any_fb_name',
                facebookId: 'any_fb_id'
            })

            const account = await pgUserRepo.findOne({ where: { id: 1 } })

            expect(account).toEqual({
                id: 1,
                email: 'any_email@mail.com',
                name: 'any_fb_name',
                facebookId: 'any_fb_id'
            })
            expect(id).toBe('1')
        })
    })
})
