import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import Items from '../components/Items';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';

export default function FamilyMember() {
    const { displayName, items } = useFamilyMemberParam();

    return (
      <>
        <Link to='/home'>{'< Home'}</Link>
        <Heading>{displayName}</Heading>
        <Items items={items} />
      </>
    )
}
