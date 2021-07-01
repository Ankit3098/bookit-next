import React from 'react'
import { getSession } from 'next-auth/client'
import Register from '../components/auth/Register'
import Layout from '../components/Layout/Layout'

const RegisterPage = () => {
    return (
        <Layout title="Register">
            <Register />
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const session = await getSession({ req: ctx.req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                parmanent: false
            }
        }
    }

    return {
        props: {}
    }

}

export default RegisterPage