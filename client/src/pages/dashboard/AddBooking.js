import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    date,
    roomid,
    roomidOptions,
    deskid,
    deskidOptions,
    handleChange,
    clearValues, 
    createBooking
  } = useAppContext()

  const handleBookingInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!date || !roomid || !deskid ) {
      displayAlert()
      return
    }
    if (isEditing) {
      // eventually edit job
    }
    createBooking()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit booking' : 'add booking'} </h3>
        {showAlert && <Alert />}
        <div className='form-center'>
        {/* room name */}
        <FormRowSelect
        labelText='Room'
        name='roomid'
        value={roomid}
        handleChange={handleBookingInput}
        list={roomidOptions}
        />

        {/* desk id */}
        <FormRowSelect
        labelText='desk'
        name='deskid'
        value={deskid}
        handleChange={handleBookingInput}
        list={deskidOptions}
        />

        <FormRow
        type='date'
        name='date'
        value={date}
        handleChange={handleBookingInput}
        />

        <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
            submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
            clear
            </button>
        </div>
      </div>
    </form>
  </Wrapper>
  )
}

export default AddJob