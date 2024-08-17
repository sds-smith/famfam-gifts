import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMembersContext } from '../context/FamilyMembersContext';
import { VStack } from '@chakra-ui/react';
import FamilyMemberCard from '../components/FamilyMemberCard';
import FamilyMember from './FamilyMember';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { familyMembers } = useFamilyMembersContext();

  useEffect(() => console.log('[Home]',{familyMembers}))

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser])

  return (
    <div style={{paddingTop: '30px'}}>
      <Routes>
        <Route path='/' element={          
          <VStack
            spacing={4}
          >
            { familyMembers?.map(member => (
              <FamilyMemberCard 
                key={member?.uid}
                member={member} 
              />
            ))}
          </VStack>} 
        />
        <Route path=':memberParam' element={<FamilyMember/>}/>
      </Routes>

    </div>
  )
}
