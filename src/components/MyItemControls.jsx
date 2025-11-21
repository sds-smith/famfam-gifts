import { useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditItemModal from './EditItemModal';
import DeleteAlertDialog from './DeleteAlertDialog';
import { useEditList } from '../hooks/useEditList';

export default function MyItemControls({ item }) {

  const [ isOpenEdit, setIsOpenEdit ] = useState(false);
  const [ isOpenDelete, setIsOpenDelete ] = useState(false);

  const onOpenEdit = () => setIsOpenEdit(true)
  const onOpenDelete = () => setIsOpenDelete(true)
  const onCloseEdit = () => setIsOpenEdit(false)
  const onCloseDelete = () => setIsOpenDelete(false)

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