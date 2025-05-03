import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { cleanup, init } from './whatsapp.js'
import cors from 'cors'
// import bodyParser from 'body-parser'

const app = express()

const host = process.env.HOST || undefined
const port = parseInt(process.env.PORT ?? 8000)

app.set('trust proxy', true)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.json({ limit: '10mb' }))

app.use('/', routes)

const listenerCallback = () => {
    init()
    console.log(`Server is listening on http://${host ? host : 'localhost'}:${port}`)
}

if (host) {
    app.listen(port, host, listenerCallback)
} else {
    app.listen(port, listenerCallback)
}

nodeCleanup(cleanup)

export default app
