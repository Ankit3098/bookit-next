import nc from 'next-connect'
import { singleRoom, updateRoom, deleteRoom } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler.get(singleRoom)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom)

export default handler