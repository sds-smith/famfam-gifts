
import { useParams } from 'react-router-dom';
import { useFamilyMembersContext } from '../context/FamilyMembersContext';

export function useFamilyMemberParam() {
    const { memberParam } = useParams();
    const { familyMembers } = useFamilyMembersContext();

    return familyMembers?.find(member => member?.displayName === memberParam?.replace('_', ' ')) || {};
}