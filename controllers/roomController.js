import cloudinary from 'cloudinary'
import Room from '../models/room'
import Booking from '../models/booking'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'

// METHO:GET
// GET ROOM => api/rooms
const allRooms = catchAsyncError(async (req, res) => {

    const resultPerPage = 4
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query
    const filteredCount = rooms.length

    apiFeatures.pagination(resultPerPage)
    rooms = await apiFeatures.query

    res.status(200).json({
        success: true,
        roomsCount,
        filteredCount,
        resultPerPage,
        rooms
    })

})

// METHO:POST
// CREATE ROOM => api/rooms
const newRoom = catchAsyncError(async (req, res) => {

    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/rooms',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })

})

// METHO:GET
// FIND SINGLE ROOM => api/rooms/:id
const singleRoom = catchAsyncError(async (req, res, next) => {

    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        room
    })

})

// METHO:PUT
// UPDATE SINGLE ROOM => api/rooms/:id
const updateRoom = catchAsyncError(async (req, res, next) => {

    let room = await Room.findById(req.query.id)
    if (!room) {
        return next(new ErrorHandler("Room not found with this ID", 404))
    }

    if (req.body.images) {
        // delete old images
        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.v2.uploader.destroy(room.images[i].public_id)
        }
        let imagesLinks = []
        const images = req.body.images;
        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bookit/rooms',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        room
    })

})

// METHO:DELETE
// DELETE SINGLE ROOM => api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res, next) => {

    const room = await Room.findById(req.query.id)
    if (!room) {
        return next(new ErrorHandler("Room not found with this ID", 404))
    }

    for (let i = 0; i < room.images.length; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
    }
    await room.remove()
    res.status(200).json({
        success: true,
        message: "Roome is delete"
    })
})

// METHO:post
// DELETE SINGLE ROOM => api/rooms/review
const createRoomReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, roomId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const room = await Room.findById(roomId);

    const isReviewed = room.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {

        room.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        room.reviews.push(review);
        room.numOfReviews = room.reviews.length
    }

    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length

    await room.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })

})

// METHO:get
//  => api/review/check_review_availability
const checkReviewAvailability = catchAsyncError(async (req, res, next) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, room: roomId })

    let isReviewAvailable = false;
    if (bookings.length > 0) isReviewAvailable = true


    res.status(200).json({
        success: true,
        isReviewAvailable
    })

})

// all rooms - ADMIN => /api/admin/rooms
const allAdminRooms = catchAsyncError(async (req, res, next) => {

    const rooms = await Room.find()


    res.status(200).json({
        success: true,
        rooms
    })
})



// Get all room reviews - ADMIN   =>   /api/reviews
const getRoomReviews = catchAsyncError(async (req, res) => {

    const room = await Room.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: room.reviews
    })

})


// Delete room review - ADMIN   =>   /api/reviews
const deleteReview = catchAsyncError(async (req, res) => {

    const room = await Room.findById(req.query.roomId);

    const reviews = room.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;

    const ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Room.findByIdAndUpdate(req.query.roomId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

export {
    allRooms,
    newRoom,
    singleRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkReviewAvailability,
    allAdminRooms,
    deleteReview,
    getRoomReviews
}