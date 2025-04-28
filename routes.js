import { Router } from 'express'
import sessionsRoute from './routes/sessionsRoute.js'
import chatsRoute from './routes/chatsRoute.js'
import groupsRoute from './routes/groupsRoute.js'
import miscRoute from './routes/miscRoute.js'
import response from './response.js'
import authenticationValidator from './middlewares/authenticationValidator.js'

const router = Router()

// Use auth middleware for all routes
router.use(authenticationValidator)

router.use('/sessions', sessionsRoute)
router.use('/chats', chatsRoute)
router.use('/groups', groupsRoute)
router.use('/misc', miscRoute)

router.all('*', (req, res) => {
    response(res, 404, false, 'The requested url cannot be found.')
})

export default router
