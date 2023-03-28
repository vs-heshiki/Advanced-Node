import { PgUser } from '@/infra/postgres/entities'
import { DataSource, DataSourceOptions } from 'typeorm'
import sensEnv from '@/main/configs/sens-env'

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'fanny.db.elephantsql.com',
    url: sensEnv.URL,
    port: 5432,
    username: 'ycckelan',
    password: sensEnv.PASSWORD_DB,
    database: 'ycckelan',
    synchronize: true,
    entities: [PgUser]
}

export const dataSource: DataSource = new DataSource(options)
