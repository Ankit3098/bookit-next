import User from '../models/user'
import cloudinary from 'cloudinary'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// METHO:POST
// GET ROOM => api/auth/register
const userRegister = catchAsyncError(async (req, res) => {

    console.log("User Register controller");

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })

    console.log("result", result);

    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: 'Account Registered successfully'
    })

})

const currentUserProfile = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })

})

export {
    userRegister,
    currentUserProfile
}