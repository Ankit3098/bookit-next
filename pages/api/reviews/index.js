import nc from 'next-connect'
import { createRoomReview, getRoomReviews, deleteReview } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'
import onError from '../../../middlewares/error'

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).put(createRoomReview)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getRoomReviews)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteReview)

export default handler