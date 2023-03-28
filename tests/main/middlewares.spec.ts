import request from 'supertest'
import { app } from '@/main/configs/app'

describe('Middlewares', () => {
    describe('CORS', () => {
        test('Should enable cors', async () => {
            app.post('/cors', (req, res) => {
                res.send()
            })
            await request(app)
                .post('/cors')
                .expect('access-control-allow-origin', '*')
                .expect('access-control-allow-methods', '*')
                .expect('access-control-allow-headers', '*')
        })
    })

    describe('Content Type', () => {
        test('Should return default content type as json', async () => {
            app.post('/contextType', (req, res) => {
                res.send('')
            })
            await request(app)
                .post('/contextType')
                .expect('content-type', /json/)
        })

        test('Should return xml content type when forced', async () => {
            app.post('/contextType_XML', (req, res) => {
                res.type('xml')
                res.send('')
            })
            await request(app)
                .post('/contextType_XML')
                .expect('content-type', /xml/)
        })
    })

    describe('Body Parser', () => {
        test('Should parse body as json', async () => {
            app.post('/bodyParser', (req, res) => {
                res.send(req.body)
            })
            await request(app)
                .post('/bodyParser')
                .send({ name: 'Victor' })
                .expect({ name: 'Victor' })
        })
    })
})
