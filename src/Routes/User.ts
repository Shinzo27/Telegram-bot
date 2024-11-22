import Router from 'express'
import { blockUser, getUser, unblockUser, updateApiKey } from '../Controller/UserController'

const router = Router()

router.get('/getUser', getUser)
router.post('/blockUser', blockUser)
router.post('/unblockUser', unblockUser)
router.post('/updateApiKey', updateApiKey)

export default router