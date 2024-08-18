
import { Button, VStack, useDisclosure } from '@chakra-ui/react'
import ItemCard from './ItemCard';
import EditItemModal from './EditItemModal';

export default function Items({ items }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <VStack spacing={4} align='start'>
                <Button colorScheme='blue' onClick={onOpen}>Add Item</Button>
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
