import { isSessionExists, isSessionConnected } from '../whatsapp.js'
import response from './../response.js'

const validate = (req, res, next) => {
    const sessionId = req.query.id ?? req.params.id

    if (!isSessionExists(sessionId)) {
        return response(res, 404, false, 'Session not found.')
    }

    if (req.baseUrl !== '/sessions' && !isSessionConnected(sessionId)) {
        return response(res, 400, false, 'There is no connection with whatsapp at the moment, please try again')
    }

    res.locals.sessionId = sessionId
    next()
}

export default validate
