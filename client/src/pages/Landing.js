import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>Desk Booking App </h1>
          <p>I'm baby williamsburg heirloom pabst, 
            venmo air plant hot chicken af wayfarers 
            ennui gochujang knausgaard. Narwhal iPhone 
            hexagon chambray poutine prism helvetica freegan. 
          </p>
          <Link to='/register' className='btn btn-hero'>Login/Register</Link>
        </div>
        <div>
          <img src={main} alt='Job Hunt' className='img main-img'></img>
        </div>
      </div>
      </Wrapper>
  )
}


export default Landing

