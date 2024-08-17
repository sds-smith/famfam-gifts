
import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';

export default function Navigation() {
  return (
    <div style={{minHeight: '100vh', position: 'relative'}}>
      <TopNav />
      <Outlet />
    </div>
  )
}
