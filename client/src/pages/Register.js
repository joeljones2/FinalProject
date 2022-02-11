import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Alert from '../components/Alert'
import Wrapper from '../assets/wrappers/RegisterPage'
import FormRow from '../components/FormRow'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  clearance: '',
  manager: '',
  isMember: true,
}
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, clearance, manager, isMember} = values
    if (!email || !password || (!isMember && !manager && !clearance)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password, clearance, manager }
    
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
      setTimeout(() => {
        navigate ('/')
       }, 3000)
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
      setTimeout(() => {
        navigate ('/')
       }, 3000)
    }
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert></Alert>}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* name field */}
        <FormRow 
        type='text'
        name='email'
        value={values.email}
        handleChange={handleChange}
        />
        {/* password field */}
        <FormRow 
        type='password'
        name='password'
        value={values.password}
        handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRow
            type='text'
            name='manager'
            value={values.manager}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow 
            type='text'
            name='clearance'
            value={values.clearance}
            handleChange={handleChange}
          />
        )}

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember?'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember?'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
