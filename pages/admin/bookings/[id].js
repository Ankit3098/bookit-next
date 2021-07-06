import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/Layout/Layout'
import { wrapper } from '../../../store/store'
import { getBookingDetails } from '../../../store/actions/bookingAction'
import BookingDetail from '../../../components/booking/BookingDetail'

const BookingDetailPage = () => {
    return (
        <Layout title="Booking Details">
            <BookingDetail />
        </Layout>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ req, params, store }) => {

    const session = await getSession({ req })

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                parmanent: false
            }
        }
    }

    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id))

    return {
        props: {
            session
        }
    }

})


export default BookingDetailPage
