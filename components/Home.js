import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import RoomItem from './room/RoomItem'

import { clearError } from '../store/actions/roomAction'

const Home = () => {

    const router = useRouter()

    const dispatch = useDispatch()
    const { rooms, error, roomsCount, resultPerPage, filteredCount } = useSelector(state => state.allRooms)

    let { location, page } = router.query
    page = Number(page)

    const handlePagination = (pageNumber) => {
        window.location.href = `/?page=${pageNumber}`
    }

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [dispatch, error])

    let count = roomsCount
    if (location) {
        count = filteredCount
    }

    return (
        <>
            <section id="rooms" className="container mt-5">

                <h2 className='mb-3 ml-2 stays-heading'>{location ? `Rooms in ${location}` : "All rooms"}</h2>
                <Link href='/search'>
                    <a className='ml-2 back-to-search'> <i className='fa fa-arrow-left'></i> Back to Search</a>
                </Link>

                <div className="row">
                    {
                        rooms && rooms.length === 0 ? (
                            <div className="alert alert-danger">No Rooms.</div>
                        ) : (
                            rooms.map((room) => (
                                <RoomItem key={room._id} room={room} />
                            ))
                        )
                    }
                </div>
            </section>
            {resultPerPage < count &&
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={count}
                        onChange={handlePagination}
                        nextPageText={"Next"}
                        prevPageText={'Prev'}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>

            }
        </>
    )
}

export default Home
