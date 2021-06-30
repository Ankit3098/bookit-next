import Room from '../models/room'
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

    const room = await Room.create(req.body)
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
    await room.remove()
    res.status(200).json({
        success: true,
        message: "Roome is delete"
    })
})

export {
    allRooms,
    newRoom,
    singleRoom,
    updateRoom,
    deleteRoom
}