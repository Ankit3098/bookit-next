import catchAsyncError from './catchAsyncError'
import ErrorHandler from '../utils/errorHandler'
import { getSession } from 'next-auth/client'

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const session = await getSession({ req })

    console.log(session);
    if (!session) {
        return next(new ErrorHandler("Login first to access this resourses", 401))
    }

    req.user = session.user
    next()
})

// handling user role

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to acceess the this resoures`, 403))
        }
        next()
    }
}

export { isAuthenticatedUser, authorizeRoles }