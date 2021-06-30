import React from 'react'
import Layout from '../../components/Layout/Layout'
import RoomDetails from '../../components/room/RoomDetails'
import { getRoomDetails } from '../../store/actions/roomAction'
import { wrapper } from '../../store/store'

const RoomDetailsPage = () => {
    return (
        <Layout>
            <RoomDetails title="Room Detail" />
        </Layout>
    )
}

export default RoomDetailsPage

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, params, store }) => {
    await store.dispatch(getRoomDetails(req, params.id))
})