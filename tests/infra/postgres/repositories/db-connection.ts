import { IMemoryDb, newDb } from 'pg-mem'
import { DataSource } from 'typeorm'

type FakeDbResponse = {
    db: IMemoryDb
    dataSource: DataSource
}

export const makeFakeDb = async (entities?: any[]): Promise<FakeDbResponse> => {
    const db = newDb({
        autoCreateForeignKeyIndices: true
    })

    db.public.registerFunction({
        implementation: () => 'test',
        name: 'current_database'
    })

    db.public.registerFunction({
        implementation: () => 'test',
        name: 'version'
    })

    const dataSource = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: entities ?? ['src/infra/postgres/entities/index.{js,ts}']
    })
    await dataSource.initialize()
    await dataSource.synchronize()

    return { db, dataSource }
}
