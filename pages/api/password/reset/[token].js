import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'

import { passwordReset } from '../../../../controllers/authController'

import onError from '../../../../middlewares/error'

const handler = nc({ onError });

dbConnect();

handler.put(passwordReset)

export default handler;