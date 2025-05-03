import os from 'os'
import fs from 'fs'
import path from 'path'
import __dirname from '../dirname.js'

/** Directorio para almacenamiento de archivos */
const getOutputDir = () => {
    const dir = path.join(__dirname, 'public')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    return dir
}

/** Construye la URL completa desde un request */
const getFullUrl = (req) => `${req.protocol}://${req.get('host')}${req.baseUrl || ''}`

/** Construye la base URL desde un request */
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`

/** IP real del cliente, soporta proxies */
const getClientIp = (req) => req.headers['x-forwarded-for'] || req.connection?.remoteAddress || ''

/** Info del sistema operativo */
const getOsInfo = () => ({
    type: os.type(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    loadavg: os.loadavg(),
    totalmem: os.totalmem(),
})

/** IP pública de red local */
const getLocalPublicIP = () => {
    for (const iface of Object.values(os.networkInterfaces()).flat()) {
        if (iface.family === 'IPv4' && !iface.internal) return iface.address
    }
    return '127.0.0.1'
}

/** Devuelve true si está en entorno de producción */
const isProduction = () => process.env.NODE_ENV === 'production'

/** Host para app.listen() según entorno */
const getHostForListen = () => (isProduction() ? '0.0.0.0' : '127.0.0.1')

/** Base URL sin request, adaptable a entorno */
const getBaseUrlWithoutRequest = (app = null) => {
    const protocol = (process.env.PROTOCOL || 'http').toLowerCase()
    const host = app?.get?.('host') || process.env.HOST || getLocalPublicIP()
    const port = parseInt(process.env.PORT || '8000', 10)
    const defaultPort = (protocol === 'http' && port === 80) || (protocol === 'https' && port === 443)
    return `${protocol}://${host}${defaultPort ? '' : `:${port}`}`
}

export {
    getOutputDir,
    getFullUrl,
    getBaseUrl,
    getClientIp,
    getOsInfo,
    getLocalPublicIP,
    getBaseUrlWithoutRequest,
    getHostForListen,
    isProduction,
}
