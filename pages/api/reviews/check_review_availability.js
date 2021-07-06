import nc from 'next-connect'
import { checkReviewAvailability } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/error'


const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).get(checkReviewAvailability)

export default handler