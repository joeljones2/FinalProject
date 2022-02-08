import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import { Error,Landing,Register,ProtectedRoute} from './pages'
import { Profile, SharedLayout, Stats, AllBookings, AddBooking } from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'            element={<ProtectedRoute>
                                        <SharedLayout />
                                        </ProtectedRoute>}>
    <Route index               element={<Stats />} />
    <Route path='all-bookings' element={<AllBookings />} />
    <Route path='add-booking'  element={<AddBooking/>} />
    <Route path='profile'      element={<Profile />} />
    </Route>
    <Route path="/" element={<div>dashboard</div>} />
    <Route path="/register" element={<Register />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>

  )
}


export default App
