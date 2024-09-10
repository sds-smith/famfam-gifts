import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Select, Button } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext'
import { useFamilyMembersContext } from '../context/FamilyMembersContext';
import { useEditList } from '../hooks/useEditList';

export default function Admin() {
    const navigate = useNavigate();
    const {currentUser} = useAuthContext();
    const { familyMembers, updateFamilyMembers } = useFamilyMembersContext();
    const { combineUsers } = useEditList();

    const [firstUser, setFirstUser] = useState(null)
    const [secondUser, setSecondUser] = useState(null)

    const handleChangeFirst = (e) => setFirstUser(e.target.value)
    const handleChangeSecond = (e) => setSecondUser(e.target.value)

    const handleCombine = () => {
        combineUsers(firstUser, secondUser)
    }
    
    useEffect(()=> {
        console.log({familyMembers})
        if (currentUser.uid !== 'lT2RK45Bb8WSmOKL78MLhBX7u6H3') navigate('/')
    }, [currentUser, familyMembers]);

        
    useEffect(()=> {
        console.log({firstUser})
    }, [firstUser]);

        
    useEffect(()=> {
        console.log({secondUser})
    }, [secondUser]);

    return (
      <>
          <div>Admin</div>
          <Select placeholder='Select first user' value={firstUser} onChange={handleChangeFirst}>
            { familyMembers?.map(fm => <option value={fm.uid}>{`${fm.displayName} ${fm.uid}`}</option>)}
          </Select>
          <Select placeholder='Select second user' value={secondUser} onChange={handleChangeSecond}>
            { familyMembers?.map(fm => <option value={fm.uid}>{`${fm.displayName} ${fm.uid}`}</option>)}
          </Select>
          <Button onClick={handleCombine} isDisabled={!firstUser || !secondUser}>Combine Users</Button>
      </>
    )
}
