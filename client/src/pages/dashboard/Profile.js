import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [manager, setManager] = useState(user?.manager)
  const [clearance, setClearance] = useState(user?.clearance)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !clearance || !manager) {
      // test and remove temporary
      displayAlert()
      return
    }
    updateUser({ name, email, clearance, manager })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            labelText='manager'
            type='text'
            name='manager'
            value={manager}
            handleChange={(e) => setManager(e.target.value)}
          />
         <FormRow
            labelText='clearance'
            type='text'
            name='clearance'
            value={clearance}
            handleChange={(e) => setClearance(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile