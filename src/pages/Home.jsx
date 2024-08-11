import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SignInOutButton from '../components/SignInOutButton';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMembersContext } from '../context/FamilyMembersContext';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { familyMembers } = useFamilyMembersContext();

  useEffect(() => console.log('[Home]',{familyMembers}))

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser])

  return (
    <div>
        Home
        <SignInOutButton />
    </div>
  )
}
