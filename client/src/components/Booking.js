import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaKeyboard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Booking.js'
import BookingInfo from './BookingInfo'

const Booking = ({
  _id,
  roomid,
  deskid,
  date,
}) => {
  const { deleteBooking } = useAppContext()

  let cdate = moment(date)
  cdate = cdate.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'><FaCalendarAlt></FaCalendarAlt></div>
        <div className='info'>
          <h5>{roomid}</h5>
          <p>{deskid}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <BookingInfo icon={<FaLocationArrow />} text={roomid} />
          <BookingInfo icon={<FaKeyboard />} text={deskid} />
          <div className={`date ${cdate}`}>{cdate}</div>
        </div>
        <footer>
          <div className='actions'>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteBooking(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Booking