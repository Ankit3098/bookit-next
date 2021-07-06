import nc from 'next-connect'
import { createRoomReview } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/error'

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).put(createRoomReview)

export default handler