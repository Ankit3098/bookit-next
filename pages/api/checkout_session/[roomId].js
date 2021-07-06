import nc from 'next-connect'
import { stripeCheckoutSession } from '../../../controllers/paymentController'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { isAuthenticatedUser } from '../../../middlewares/auth'


const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).get(stripeCheckoutSession)

export default handler