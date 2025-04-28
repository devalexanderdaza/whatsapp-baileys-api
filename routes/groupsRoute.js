import { Router } from 'express'
import { body, query } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/groupsController.js'
import getMessages from './../controllers/getMessages.js'

const router = Router()

router.get('/', query('id').notEmpty(), requestValidator, sessionValidator, controller.getList)

router.post(
    '/create',
    query('id').notEmpty(),
    body('groupName').notEmpty(),
    body('participants').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.create
)

router.post(
    '/send/:jid',
    query('id').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.send
)

router.get('/:jid', query('id').notEmpty(), requestValidator, sessionValidator, getMessages)

router.get('/meta/:jid', query('id').notEmpty(), requestValidator, sessionValidator, controller.getGroupMetaData)

router.post(
    '/participants-update/:jid',
    query('id').notEmpty(),
    body('action').notEmpty(),
    body('participants').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupParticipantsUpdate
)

router.post(
    '/subject-update/:jid',
    query('id').notEmpty(),
    body('subject').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupUpdateSubject
)

router.post(
    '/description-update/:jid',
    query('id').notEmpty(),
    body('description').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupUpdateDescription
)

router.post(
    '/setting-update/:jid',
    query('id').notEmpty(),
    body('settings').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupSettingUpdate
)

router.post('/leave/:jid', query('id').notEmpty(), requestValidator, sessionValidator, controller.groupLeave)

router.get('/invite-code/:jid', query('id').notEmpty(), requestValidator, sessionValidator, controller.groupInviteCode)

router.post(
    '/accept-invite',
    query('id').notEmpty(),
    body('invite').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupAcceptInvite
)

router.post(
    '/revoke-code/:jid',
    query('id').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.groupRevokeInvite
)

router.post(
    '/profile-picture/:jid',
    query('id').notEmpty(),
    body('url').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.updateProfilePicture
)

router.post(
    '/get-participants',
    query('id').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.getListWithoutParticipants
)

export default router
