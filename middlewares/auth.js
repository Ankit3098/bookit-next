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

export { isAuthenticatedUser }