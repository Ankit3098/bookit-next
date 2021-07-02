import Booking from '../models/booking'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'
import Moment from 'moment'
import { extendMoment } from 'moment-range'


const moment = extendMoment(Moment)

const newBooking = catchAsyncError(async (req, res) => {

    const { room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo } = req.body

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })

})

// Create new booking   =>   /api/bookings/check
const checkRoomAvailability = catchAsyncError(async (req, res) => {

    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]
    })

    // Check if there is any booking available
    let isAvailable;

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    })
})

// Create new booking   =>   /api/bookings/check_bookes_dates
const checkBookedDatesOfRoom = catchAsyncError(async (req, res) => {

    let { roomId } = req.query;
    const bookings = await Booking.find({ room: roomId })

    let bookedDates = []
    const timeDiffernece = moment().utcOffset() / 60;

    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })


    res.status(200).json({
        success: true,
        bookedDates
    })
})

// get all  bookings of current user   =>   /api/bookings/me
const myBookings = catchAsyncError(async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })




    res.status(200).json({
        success: true,
        bookings
    })
})

// get all  bookings of current user   =>   /api/bookings/:id
const getBookingsDetails = catchAsyncError(async (req, res) => {

    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })
    res.status(200).json({
        success: true,
        booking
    })
})

export {
    newBooking,
    checkRoomAvailability,
    checkBookedDatesOfRoom,
    myBookings,
    getBookingsDetails
}