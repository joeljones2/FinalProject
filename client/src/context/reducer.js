import { DISPLAY_ALERT, CLEAR_ALERT, 
  SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR,
  LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
  HANDLE_CHANGE, CREATE_BOOKING_BEGIN, CREATE_BOOKING_ERROR, CREATE_BOOKING_SUCCESS, 
  CLEAR_VALUES, GET_BOOKINGS_SUCCESS, GET_BOOKINGS_BEGIN, DELETE_BOOKING_BEGIN,
  SHOW_STATS_SUCCESS, SHOW_STATS_BEGIN } from "./actions"

  import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
          ...state,
          showAlert: true,
          alertType: 'danger',
          alertText: 'Please provide all values!',
        }
      }
    if (action.type === CLEAR_ALERT) {
        return {
          ...state,
          showAlert: false,
          alertType: '',
          alertText: '',
        }
      }
      if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === SETUP_USER_SUCCESS) {
        return {
          ...state,
          isLoading: true,
          token: action.payload.token,
          user: action.payload.user,
          clearance: action.payload.clearance,
          manager: action.payload.manager,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        }
      }
      if (action.type === SETUP_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
    if (action.type === TOGGLE_SIDEBAR) {
      return { 
        ...state,
         showSidebar: !state.showSidebar, }
    }
    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        user: null,
        token: null,
        manager: '',
        clearance: '',
      }
    }
    if (action.type === UPDATE_USER_BEGIN) {
      return { ...state, isLoading: true }
    }   
    if (action.type === UPDATE_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        token:action.payload.token,
        user: action.payload.user,
        manager: action.payload.manager,
        clearance: action.payload.clearance,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!',
      }
    }
    if (action.type === UPDATE_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === HANDLE_CHANGE) {
      return { ...state, [action.payload.name]: action.payload.value }
    }
    if (action.type === CLEAR_VALUES) {
      const initialState = {
        isEditing: false,
        user: null,
        token: null,
        manager: '',
        clearance: '',
      }
      return { ...state, ...initialState }
    }
    if (action.type === CREATE_BOOKING_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_BOOKING_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Booking Confirmed',
      }
    }
    if (action.type === CREATE_BOOKING_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === GET_BOOKINGS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_BOOKINGS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        bookings: action.payload.bookings,
        totalBookings: action.payload.totalBookings,
        numOfPages: action.payload.numOfPages,
      }
    }
    if (action.type === DELETE_BOOKING_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === SHOW_STATS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === SHOW_STATS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyBookings: action.payload.monthlyBookings,
      }
    }
    throw new Error(`no such action :${action.type}`)
  }
  export default reducer