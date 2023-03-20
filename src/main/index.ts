import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'
import env from '@/main/config/env'

app.listen(env.PORT, () => {
    console.log(`Listening in ${env.PORT} port`)
})
