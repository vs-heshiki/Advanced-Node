import { PgUser } from '@/infra/postgres/entities'
import { DataSource, DataSourceOptions } from 'typeorm'

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwer',
    database: 'postgres',
    synchronize: true,
    entities: [PgUser]
}

export const dataSource: DataSource = new DataSource(options)
