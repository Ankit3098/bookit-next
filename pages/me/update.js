import React, { createContext } from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/Layout/Layout'
import Profile from '../../components/user/Profile'

const UpdateProfile = () => {
    return (
        <Layout title="Update Profile">
            <Profile />
        </Layout>
    )
}



export async function getServerSideProps(ctx) {

    const session = await getSession({ req: ctx.req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                parmanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }

}


export default UpdateProfile
