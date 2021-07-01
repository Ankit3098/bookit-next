import React from 'react'
import { getSession } from 'next-auth/client'
import Login from '../components/auth/Login'
import Layout from '../components/Layout/Layout'

const LoginPage = () => {
    return (
        <Layout title="Login">
            <Login />
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
export default LoginPage
