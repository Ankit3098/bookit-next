import nc from 'next-connect'
import { getBookingsDetails } from '../../../controllers/bookingController'
import dbConnect from '../../../config/dbConnect'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/error'

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).get(getBookingsDetails)

export default handler