import { useEffect } from 'react';
import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react'
import EditItemModal from './EditItemModal';
import DeleteAlertDialog from './DeleteAlertDialog';
import { useEditList } from '../hooks/useEditList';

export default function MyItemControls({ item }) {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure('editButton');
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure('deleteButton');

  const { undoPurchase } = useEditList();
  const receive = () => {
    if (item.purchased) undoPurchase(item)
  }

  return (
    <>
      <ButtonGroup variant='outline' spacing='6'>
        <Button colorScheme='blue' onClick={onOpenEdit} id='editButton'>Edit</Button>
        <Button colorScheme='red' onClick={onOpenDelete} id='deleteButton'>Delete</Button>
        <Button colorScheme='gray' onClick={receive} id='receivedButton'>Received</Button>
      </ButtonGroup>
      <EditItemModal action='Edit' item={item} isOpen={isOpenEdit} onClose={onCloseEdit}/>
      <DeleteAlertDialog item={item} isOpen={isOpenDelete} onClose={onCloseDelete} />
    </>
  )
}