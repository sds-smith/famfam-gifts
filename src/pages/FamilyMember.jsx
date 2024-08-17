import { useParams, Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import Items from '../components/Items';
import { useFamilyMembersContext } from '../context/FamilyMembersContext';

export default function FamilyMember() {
    const { familyMembers } = useFamilyMembersContext();
    const { memberParam } = useParams();

    const { displayName, items } = familyMembers?.find(member => member?.displayName === memberParam.replace('_', ' ')) || {}; 

    return (
      <>
        <Link to='/home'>{'< Home'}</Link>
        <Heading>{displayName}</Heading>
        <Items items={items} />
      </>
    )
}
