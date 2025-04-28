import { isSessionExists, createSession, getSession, getListSessions, deleteSession } from './../whatsapp.js'
import response from './../response.js'

const find = (req, res) => {
    response(res, 200, true, 'Session found.')
}

const status = (req, res) => {
    const states = ['connecting', 'connected', 'disconnecting', 'disconnected']

    const session = getSession(res.locals.sessionId)
    let state = states[session.ws?.socket?.readyState]

    state = state === 'connected' && typeof session.user !== 'undefined' ? 'authenticated' : state

    response(res, 200, true, '', { status: state })
}

const add = (req, res) => {
    const { id, typeAuth, phoneNumber } = req.body

    if (isSessionExists(id)) {
        return response(res, 409, false, 'Session already exists, please use another id.')
    }

    if (!['qr', 'code'].includes(typeAuth) && typeAuth !== undefined) {
        return response(res, 400, false, 'typeAuth must be qr or code.')
    }

    const usePairingCode = typeAuth === 'code'

    if (usePairingCode && !phoneNumber) {
        return response(res, 400, false, 'phoneNumber is required.')
    }

    createSession(id, res, { usePairingCode, phoneNumber })
}

const del = async (req, res) => {
    const { id } = req.params
    const session = getSession(id)
    try {
        await session.logout()
        session.end()
        session.ws.close()
    } catch {
    } finally {
        deleteSession(id)
    }

    response(res, 200, true, 'The session has been successfully deleted.')
}

const list = (req, res) => {
    response(res, 200, true, 'Session list', getListSessions())
}

export { find, status, add, del, list }
