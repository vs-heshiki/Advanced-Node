import { Router } from 'express'

export default (router: Router): void => {
    router.post('/facebook-login', (req, res) => {
        res.send({ data: 'any_data' })
    })
}
