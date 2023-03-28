import 'reflect-metadata'
import './configs/module-alias'

import { app } from '@/main/configs/app'
import env from '@/main/configs/env'

app.listen(env.PORT, () => {
    console.log(`Listening in ${env.PORT} port`)
})
