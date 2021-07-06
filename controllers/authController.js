import User from '../models/user'
import cloudinary from 'cloudinary'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
import APIFeatures from '../utils/apiFeatures'
import sendMail from '../utils/sendmail'
import crypto from 'crypto'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// METHO:POST
// GET ROOM => api/auth/register
const userRegister = catchAsyncError(async (req, res) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })

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


const updateUserProfile = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.body.password) user.password = req.body.password;
    }

    // Update avatar
    if (req.body.avatar !== '') {

        const image_id = user.avatar.public_id;

        // Delete user previous image/avatar
        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

    await user.save()

    res.status(200).json({
        success: true,
    })

})

// Forgot Password  /api/password/forgot
const forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // get origin
    const { origin } = absoluteUrl(req)

    // create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`

    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested to this email, then ignore it.`

    try {
        await sendMail({
            email: user.email,
            subject: 'Bookit password recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))

    }
})

// Forgot Password  /api/password/reset/:token
const passwordReset = catchAsyncError(async (req, res, next) => {


    // hash the url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or expire', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password is not match', 400))
    }

    // set the password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
        success: true,
        message: "password update successfully"
    })
})


// Get all users   =>   /api/admin/users
const allAdminUsers = catchAsyncError(async (req, res) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})


// Get user details  =>   /api/admin/users/:id
const getUserDetails = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 404))
    }

    res.status(200).json({
        success: true,
        user
    })

})


// Update user details  =>   /api/admin/users/:id
const updateUser = catchAsyncError(async (req, res) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

// Delete user    =>   /api/admin/users/:id
const deleteUser = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 400))
    }

    // Remove avatar 
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id)


    await user.remove();

    res.status(200).json({
        success: true,
        user
    })

})


export {
    userRegister,
    currentUserProfile,
    updateUserProfile,
    forgotPassword,
    passwordReset,
    allAdminUsers,
    getUserDetails,
    updateUser,
    deleteUser
}