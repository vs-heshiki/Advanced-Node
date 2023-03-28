import { adaptExpressRouter as adapt } from '@/main/adapters'
import { newFacebookLoginController as fbLoginController } from '@/main/factories/controller'
import { Router } from 'express'

export default (router: Router): void => {
    const adapter = adapt(fbLoginController())
    router.post('/login/facebook', adapter)
}
