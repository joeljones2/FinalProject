import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Booking from './Booking'
import Wrapper from '../assets/wrappers/BookingContainer'

const BookingsContainer = () => {
  const { getBookings, bookings, isLoading, page, totalBookings, search,
    searchStatus,
    searchType,
    sort,
    numOfPages, } = useAppContext()

  useEffect(() => {
    getBookings()
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }
  if (bookings.length === 0) {
    return (
      <Wrapper>
        <h2>No bookings to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalBookings} booking{bookings.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {bookings.map((booking) => {
          return <Booking key={booking._id} {...booking} />
        })}
      </div>
    </Wrapper>
  )
}

export default BookingsContainer