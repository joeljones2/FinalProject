import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
const StatsContainer = () => {
  const { stats } = useAppContext()
  const defaultStats = [
    {
      title: 'Main1',
      count: stats.Main1 || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Main2',
      count: stats.Main2 || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'S1',
      count: stats.S1 || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
     title: 'S2',
     count: stats.S2 || 0,
     icon: <FaBug />,
     color: '#d66a6a',
     bcg: '#ffeeee',
    },
    {
     title: 'S3',
     count: stats.S3 || 0,
     icon: <FaBug />,
     color: '#d66a6a',
     bcg: '#ffeeee',
    },
    {
     title: 'CollabZone',
     count: stats.CollabZone || 0,
     icon: <FaBug />,
     color: '#d66a6a',
     bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer