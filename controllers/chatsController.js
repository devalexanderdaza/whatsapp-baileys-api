import {
    formatGroup,
    formatPhone,
    getChatList,
    getMessageMedia,
    getSession,
    getStoreMessage,
    isExists,
    readMessage,
    sendMessage,
} from './../whatsapp.js'
import response from './../response.js'
import { compareAndFilter, fileExists, isUrlValid } from './../utils/functions.js'

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId))
}

const send = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { message } = req.body
    const isGroup = req.body.isGroup ?? false
    const receiver = isGroup ? formatGroup(req.body.receiver) : formatPhone(req.body.receiver)

    const typesMessage = ['image', 'video', 'audio', 'document', 'sticker']

    const filterTypeMessage = compareAndFilter(Object.keys(message), typesMessage)
    try {
        const exists = await isExists(session, receiver, isGroup)

        if (!exists) {
            return response(res, 400, false, 'The receiver number is not exists.')
        }

        if (filterTypeMessage.length > 0) {
            const url = message[filterTypeMessage]?.url

            if (url.length === undefined || url.length === 0) {
                return response(res, 400, false, 'The URL is invalid or empty.')
            }

            if (!isUrlValid(url)) {
                if (!fileExists(url)) {
                    return response(res, 400, false, 'The file or url does not exist.')
                }
            }
        }

        await sendMessage(session, receiver, message, 0)

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}

const sendBulk = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    let messagesArray = []

    if (typeof req.body === 'object' && !Array.isArray(req.body)) {
        messagesArray.push(req.body)
    } else {
        messagesArray = req.body
    }

    // Responder inmediatamente para no bloquear la API
    response(res, 200, true, 'Bulk message process started.')

    // Procesar mensajes en segundo plano
    ;(async () => {
        for (const [key, data] of messagesArray.entries()) {
            let { receiver, message, delay, isGroup } = data

            if (!receiver || !message) {
                console.error(`Índice ${key}: Falta receptor o mensaje.`)
                continue
            }

            if (!delay || isNaN(delay)) {
                delay = 1000
            } else {
                delay = parseInt(delay)
            }

            receiver = isGroup ? formatGroup(receiver) : formatPhone(receiver)

            try {
                const exists = await isExists(session, receiver, isGroup ?? false)

                if (!exists) {
                    console.error(`Índice ${key}: El número no existe en WhatsApp.`)
                    continue
                }

                await sendMessage(session, receiver, message, delay)
                console.log(`Mensaje enviado a ${receiver}`)
            } catch (err) {
                console.error(`Índice ${key}: ${err.message}`)
            }

            // Esperar el delay antes del siguiente envío
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    })().catch((err) => {
        console.error(`Error en el procesamiento de mensajes: ${err.message}`)
    })
}

const deleteChat = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { receiver, isGroup, message } = req.body

    try {
        const jidFormat = isGroup ? formatGroup(receiver) : formatPhone(receiver)

        await sendMessage(session, jidFormat, { delete: message })
        response(res, 200, true, 'Message has been successfully deleted.')
    } catch {
        response(res, 500, false, 'Failed to delete message .')
    }
}

const forward = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { forward, receiver, isGroup } = req.body

    const { id, remoteJid } = forward
    const jidFormat = isGroup ? formatGroup(receiver) : formatPhone(receiver)

    try {
        const messages = await session.store.loadMessages(remoteJid, 25, null)

        const key = messages.filter((element) => {
            return element.key.id === id
        })

        const queryForward = {
            forward: key[0],
        }

        await sendMessage(session, jidFormat, queryForward, 0)

        response(res, 200, true, 'The message has been successfully forwarded.')
    } catch {
        response(res, 500, false, 'Failed to forward the message.')
    }
}

const read = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { keys } = req.body

    try {
        await readMessage(session, keys)

        if (!keys[0].id) {
            throw new Error('Data not found')
        }

        response(res, 200, true, 'The message has been successfully marked as read.')
    } catch {
        response(res, 500, false, 'Failed to mark the message as read.')
    }
}

const sendPresence = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { receiver, isGroup, presence } = req.body

    try {
        const jidFormat = isGroup ? formatGroup(receiver) : formatPhone(receiver)

        await session.sendPresenceUpdate(presence, jidFormat)

        response(res, 200, true, 'Presence has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send presence.')
    }
}

const downloadMedia = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const { remoteJid, messageId } = req.body

    try {
        const message = await getStoreMessage(session, messageId, remoteJid)
        const dataMessage = await getMessageMedia(session, message)

        response(res, 200, true, 'Message downloaded successfully', dataMessage)
    } catch {
        response(
            res,
            500,
            false,
            'Error downloading multimedia message: it may not exist or may not contain multimedia content.',
        )
    }
}

export { getList, send, sendBulk, deleteChat, read, forward, sendPresence, downloadMedia }
