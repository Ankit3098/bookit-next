import nc from 'next-connect'
import { updateUserProfile } from '../../../controllers/authController'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { isAuthenticatedUser } from '../../../middlewares/auth'


const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).put(updateUserProfile)

export default handler