import { PgUser } from '@/infra/postgres/entities'
import { DataSource, DataSourceOptions } from 'typeorm'
import env from '@/main/configs/env'

const options: DataSourceOptions = {
    type: 'postgres',
    host: env.HOST,
    url: env.URL,
    port: 5432,
    username: env.USERNAME,
    password: env.PASSWORD_DB,
    database: env.DATABASE,
    synchronize: true,
    entities: [PgUser]
}

export const dataSource: DataSource = new DataSource(options)
