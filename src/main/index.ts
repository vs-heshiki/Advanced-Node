import 'reflect-metadata'
import './configs/module-alias'

import * as dotenv from 'dotenv'
import env from '@/main/configs/env'
import { app } from '@/main/configs/app'
import { dataSource } from '@/infra/typeorm'

dotenv.config()

dataSource.initialize().then(() => {
    app.listen(env.PORT, () => {
        console.log(`Listening in ${env.PORT} port`)
    })
}).catch((err) => {
    console.log(err)
})
