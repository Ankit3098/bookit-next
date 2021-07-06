import React, { createContext } from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/Layout/Layout'
import AllBookings from '../../../components/admin/AllBookings'

const AllBookingsPage = () => {
    return (
        <Layout title="All Bookings">
            <AllBookings />
        </Layout>
    )
}



export async function getServerSideProps(ctx) {

    const session = await getSession({ req: ctx.req })

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                parmanent: false
            }
        }
    }

    return {
        props: {}
    }

}


export default AllBookingsPage
