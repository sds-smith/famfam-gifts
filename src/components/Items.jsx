
import { Button, VStack, useDisclosure } from '@chakra-ui/react'
import ItemCard from './ItemCard';
import EditItemModal from './EditItemModal';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';

export default function Items({ items }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentUser } = useAuthContext();
    const selectedFamilyMember = useFamilyMemberParam();

    const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

    return (
        <>
            <VStack spacing={4} align='start'>
                { userSelectedSelf && <Button colorScheme='blue' onClick={onOpen}>Add Item</Button> }
                <VStack spacing={4}>
                    { items?.map(item => (
                        <ItemCard key={item.name} item={item} />
                    ))}
                </VStack>
            </VStack>
            <EditItemModal action='Add' item={{}} isOpen={isOpen} onClose={onClose} />
        </>
      )
}
