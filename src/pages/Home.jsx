import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SignInOutButton from '../components/SignInOutButton';
import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser) navigate('/');
  })

  return (
    <div>
        Home
        <SignInOutButton />
    </div>
  )
}
