
import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';
import UserAlertDialog from '../components/UserAlertDialog';
import { useAuthContext } from '../context/AuthContext';

export default function Navigation() {
  const { userError } = useAuthContext();
  
  return (
    <div style={{minHeight: '100vh', position: 'relative'}}>
      <TopNav />
      <Outlet />
      <UserAlertDialog
        userError={userError}
        isOpen={Boolean(userError)}
      />
    </div>
  )
}
