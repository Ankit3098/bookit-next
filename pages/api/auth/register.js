import nc from 'next-connect'
import { userRegister } from '../../../controllers/authController'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'

const handler = nc({ onError })

dbConnect()

handler.post(userRegister)

export default handler