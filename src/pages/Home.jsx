import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMembersContext } from '../context/FamilyMembersContext';
import { VStack } from '@chakra-ui/react';
import FamilyMemberCard from '../components/FamilyMemberCard';
import FamilyMember from './FamilyMember';
import { updateUser } from '../utils/firebase.utils';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { familyMembers } = useFamilyMembersContext();

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser])

  const button = () => {
    console.log({familyMembers})
    familyMembers.forEach(async fm => {
      const items = fm.items.map((item, idx) => ({
        ...item,
        id: idx + 1
      }))
      await updateUser(fm.id, items)
    })
    console.log({familyMembers})
  }

  return (
    <div style={{paddingTop: '30px'}}>
      <button onClick={button}>button</button>
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
