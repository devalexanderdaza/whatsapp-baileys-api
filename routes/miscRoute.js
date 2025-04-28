import { Router } from 'express'
import { body, query } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/miscControlls.js'

const router = Router()

router.post(
    '/update-profile-status',
    query('id').notEmpty(),
    body('status').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.setProfileStatus,
)
router.post(
    '/update-profile-name',
    query('id').notEmpty(),
    body('name').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.setProfileName,
)
router.post('/my-profile', query('id').notEmpty(), requestValidator, sessionValidator, controller.getProfile)

router.post(
    '/profile-picture',
    query('id').notEmpty(),
    body('jid').notEmpty(),
    body('isGroup').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.getProfilePictureUser,
)

router.post(
    '/set-profile-picture',
    query('id').notEmpty(),
    body('url').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.setProfilePicture,
)

router.post(
    '/block-and-unblock',
    query('id').notEmpty(),
    body('jid').notEmpty(),
    body('isBlock').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.blockAndUnblockContact,
)

export default router
