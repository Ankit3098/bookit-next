import nc from 'next-connect'
import { webhookCheckout } from '../../controllers/paymentController'
import dbConnect from '../../config/dbConnect'
import onError from '../../middlewares/error'

const handler = nc({ onError })

dbConnect()

export const config = {
    api: {
        bodyParser: false,
    }
}

handler.post(webhookCheckout)

export default handler;
