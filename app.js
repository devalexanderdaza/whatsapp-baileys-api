import { config } from 'dotenv'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import cors from 'cors'
import cron from 'node-cron'
import routes from './routes.js'
import { cleanup, init } from './whatsapp.js'
import path from 'path'
import fs from 'fs'
import { getHostForListen, getOutputDir } from './utils/utils.js'
import { printStartupInfo } from './utils/logger.js'

// Carga variables desde múltiples archivos .env
config({
    path: [
        path.resolve(process.cwd(), '.env'),
        path.resolve(process.cwd(), '.env.local'),
        path.resolve(process.cwd(), '.env.development'),
    ],
})

const app = express()
const host = getHostForListen()
const port = parseInt(process.env.PORT ?? '8000', 10)

app.set('trust proxy', true)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

// Iniciar servidor
app.listen(port, host, (err) => {
    if (err) {
        console.error('❌ Error al iniciar el servidor:', err)
        process.exit(1)
    }
    init()
    printStartupInfo(app)
})

// Tarea diaria para limpiar imágenes de más de 1 día
cron.schedule('0 0 * * *', () => {
    const dir = getOutputDir()
    const now = Date.now()
    const oneDay = 86400000

    fs.readdir(dir, (err, files) => {
        if (err) return console.error('❌ Error leyendo directorio:', err)
        files.forEach((file) => {
            if (/\.(jpg|jpeg|png)$/.test(file)) {
                const filePath = path.join(dir, file)
                fs.stat(filePath, (err, stats) => {
                    if (err) return console.error('❌ Error al obtener stats:', err)
                    if (now - stats.mtimeMs > oneDay) {
                        fs.unlink(filePath, (err) => {
                            if (err) console.error('❌ Error al eliminar archivo:', err)
                        })
                    }
                })
            }
        })
    })
})

// Limpieza segura al cerrar
nodeCleanup(cleanup)

export default app
