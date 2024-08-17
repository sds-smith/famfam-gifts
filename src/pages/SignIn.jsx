import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser])

  return (
    <div style={{marginTop: '30px', fontSize: '30px'}}>
      Please Sign In to Access Application
    </div>
  )
}
