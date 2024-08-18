
import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react'
import EditItemModal from './EditItemModal';
import DeleteAlertDialog from './DeleteAlertDialog';

export default function MyItemControls({ item }) {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure('editButton');
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure('deleteButton');

  return (
    <>
      <ButtonGroup variant='outline' spacing='6'>
        <Button colorScheme='blue' onClick={onOpenEdit} id='editButton'>Edit</Button>
        <Button colorScheme='red' onClick={onOpenDelete} id='deleteButton'>Delete</Button>
      </ButtonGroup>
      <EditItemModal action='Edit' item={item} isOpen={isOpenEdit} onClose={onCloseEdit}/>
      <DeleteAlertDialog item={item} isOpen={isOpenDelete} onClose={onCloseDelete} />
    </>
  )
}