import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Layout/Loader'
import { getAdminRooms } from '../../store/actions/roomAction'
import { clearError, deleteRoom } from '../../store/actions/roomAction'
import { DELETE_ROOM_RESET } from '../../store/actioTypes/roomTypes'

const AllRooms = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, rooms, error } = useSelector(state => state.allRooms)
    const { error: deleteError, isDelete } = useSelector(state => state.updateRoom)

    useEffect(() => {

        dispatch(getAdminRooms())
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearError())
        }
        if (isDelete) {
            router.push('/admin/rooms')
            dispatch({ type: DELETE_ROOM_RESET })
        }
    }, [dispatch, error, deleteError, isDelete])

    const deleteHandler = (id) => {
        dispatch(deleteRoom(id))
    }

    const setAllRooms = () => {
        const data = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        rooms && rooms.forEach(room => {
            data.rows.push({
                id: room._id,
                name: room.name,
                price: `$${room.pricePerNight}`,
                category: room.category,
                actions:
                    <>
                        <Link href={`/admin/rooms/${room._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteHandler(room._id)} >
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })
        return data
    }

    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5' >{`${rooms && rooms.length} Rooms`}
                        <Link href='/admin/rooms/new'>
                            <a className="mt-0 btn text-white float-right new-room-btn">Create Room</a>
                        </Link>
                    </h1>
                    <MDBDataTable
                        data={setAllRooms()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </>
            }

        </div>
    )
}

export default AllRooms
