import Layout from '../components/Layout/Layout'
import Home from '../components/Home'
import { getAllRooms } from '../store/actions/roomAction'
import { wrapper } from '../store/store'


export default function Index() {

  return (
    <Layout>
      <Home />
    </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(async ({ req, query, store }) => {
  await store.dispatch(getAllRooms(req, query.page, query.location, query.guests, query.category))
})
