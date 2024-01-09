/* eslint-disable max-len */
import { useNavigate }  from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return(
    <div>
      <h1>Session Time Expired</h1>
      <button onClick={() => navigate('/')}>Log In Again</button>
    </div>
  )
}

export default NotFoundPage