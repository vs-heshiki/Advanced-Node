import { DataSource } from 'typeorm'
import env from '@/main/config/env'

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: env.PG_PASSWORD,
    database: 'Facebook',
    synchronize: true,
    logging: true,
    entities: ['@/infra/postgres/entities/'],
    subscribers: [],
    migrations: []
})

dataSource.initialize()
    .then(() => {
        console.log('connect with database!')
    })
    .catch((error) => {
        console.log(error)
    })

export { dataSource }
