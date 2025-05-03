import { getBaseUrlWithoutRequest, getLocalPublicIP, isProduction } from './utils.js'

const printStartupInfo = (app) => {
    const mode = isProduction() ? '🟢 PROD' : '🔧 DEVELOPMENT'
    const localUrl = getBaseUrlWithoutRequest(app)
    const lanUrl = localUrl.replace(/:\/\/[^:/]+/, `://${getLocalPublicIP()}`)

    console.log('\n🚀 Aplicación iniciada correctamente')
    console.log('──────────────────────────────────────────')
    console.log(`🌍 Entorno       : ${mode}`)
    console.log(`📡 Acceso local  : ${localUrl}`)
    console.log(`🌐 Acceso LAN    : ${lanUrl}`)
    console.log(`📦 Node.js       : ${process.version}`)
    console.log(`📁 Base Path     : ${process.cwd()}`)
    console.log(`🕒 Inicio        : ${new Date().toLocaleString()}`)
    console.log('──────────────────────────────────────────\n')
}

export { printStartupInfo }
