import nc from 'next-connect'
import { singleRoom, updateRoom, deleteRoom } from '../../../controllers/roomController'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'

const handler = nc({ onError })

dbConnect()

handler.get(singleRoom)
handler.put(updateRoom)
handler.delete(deleteRoom)

export default handler