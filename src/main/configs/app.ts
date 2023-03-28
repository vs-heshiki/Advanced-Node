import setupMiddlewares from '@/main/configs/middlewares'
import setupRoutes from '@/main/configs/routes'

import express from 'express'

const app = express()

setupMiddlewares(app)
setupRoutes(app)

export { app }
