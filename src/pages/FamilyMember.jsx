import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import Items from '../components/Items';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';

export default function FamilyMember() {
    const { displayName, items } = useFamilyMemberParam();

    const prioritizedItems = items?.sort ((a, b) => a.priority - b.priority)

    return (
      <>
        <Link to='/home'>{'< Home'}</Link>
        <Heading>{displayName}</Heading>
        <Items items={items} />
      </>
    )
}
