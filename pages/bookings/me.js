import React, { createContext } from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/Layout/Layout'
import MyBookings from '../../components/booking/MYBookings'
import { wrapper } from '../../store/store'
import { myBookings } from '../../store/actions/bookingAction'

const MyBookingPage = () => {
    return (
        <Layout title="My Bookings">
            <MyBookings />
        </Layout>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {

    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                parmanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))

    return {
        props: {
            session
        }
    }

})


export default MyBookingPage
