import nc from 'next-connect'
import { allAdminRooms } from '../../../../controllers/roomController'
import dbConnect from '../../../../config/dbConnect'
import onError from '../../../../middlewares/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'


const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminRooms)

export default handler