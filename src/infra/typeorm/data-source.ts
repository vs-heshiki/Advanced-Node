import { DataSource } from 'typeorm'
import env from '@/main/configs/env'

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: env.PG_PASSWORD,
    database: 'Facebook',
    synchronize: true,
    logging: true,
    entities: ['src/infra/postgres/entities/index.{js,ts}'],
    subscribers: [],
    migrations: []
})
