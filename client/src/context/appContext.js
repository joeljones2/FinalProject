import React, { useState, useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import { DISPLAY_ALERT, CLEAR_ALERT, 
  SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR,
  LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
  HANDLE_CHANGE, CREATE_BOOKING_BEGIN, CREATE_BOOKING_ERROR, CREATE_BOOKING_SUCCESS,
  CLEAR_VALUES, GET_BOOKINGS_BEGIN, GET_BOOKINGS_SUCCESS, DELETE_BOOKING_BEGIN} from "./actions"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const manager = localStorage.getItem('manager')
const clearance = localStorage.getItem('clearance')

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  manager: manager,
  clearance: clearance,
  showSidebar: false,
  isEditing: false,
  editBookingId: '',
  date: '',
  roomidOptions: ['Main Office 1', 'Main Office 2', 'Secure Room 1', 'Secure Room 2', 'Secure Room 3', 'Collab Zone'],
  roomid: 'Main Office 1',
  deskidOptions: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6',
                  'A7', 'A8', 'A9', 'A10', 'A11', 'A12',
                   'A13', 'A14', 'A15', 'A16'], 
  deskid: 'A1', 
  bookings: [],
  totalBookings: 0,
  numOfPages: 1,
  page: 1,
}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
      dispatch({type:DISPLAY_ALERT})
      clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, manager, clearance }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('manager', manager)
    localStorage.setItem('clearance', clearance)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('manager')
    localStorage.removeItem('clearance')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, token, clearance, manager } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, clearance, manager },
      })
      addUserToLocalStorage({ user, token, clearance, manager })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const createBooking = async () => {
    dispatch({ type: CREATE_BOOKING_BEGIN })
    try {
      const { roomid, deskid, date } = state
  
      await authFetch.post('/bookings', {
        roomid, 
        deskid, 
        date
      })
      dispatch({
        type: CREATE_BOOKING_SUCCESS,
      })
      // call function instead clearValues()
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_BOOKING_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getBookings = async () => {
    let url = `/bookings/`

    dispatch({ type: GET_BOOKINGS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { bookings, totalBookings, numOfPages } = data
      dispatch({
        type: GET_BOOKINGS_SUCCESS,
        payload: {
          bookings,
          totalBookings,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  
  

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const setEditBooking = () => {
    console.log('set edit booking')
  }

  const deleteBooking = async (bookingId) => {
    dispatch({ type: DELETE_BOOKING_BEGIN })
    try {
      await authFetch.delete(`/bookings/${bookingId}`)
      getBookings()
    } catch (error) {
      logoutUser()
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state, displayAlert, setupUser, toggleSidebar, logoutUser,
         updateUser, createBooking, handleChange, clearValues, getBookings,
         setEditBooking, deleteBooking
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }