import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { checkRoomAvailability } from '../../../controllers/bookingController';

import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomAvailability);

export default handler;