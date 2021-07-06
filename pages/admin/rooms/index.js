import React, { createContext } from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/Layout/Layout'
import AllRooms from '../../../components/admin/AllRooms'

const AllRoomsPage = () => {
    return (
        <Layout title="All Rooms">
            <AllRooms />
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


export default AllRoomsPage
