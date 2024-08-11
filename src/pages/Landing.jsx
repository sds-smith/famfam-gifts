
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Landing() {
    const { currentUser } = useAuthContext();

    const resolvedRoute = {
      true: '/home',
      false: '/sign-in'
    }

    return (
      <Navigate to={resolvedRoute[Boolean(currentUser)]} />
    )
}
