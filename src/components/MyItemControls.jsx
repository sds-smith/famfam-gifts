import { useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditItemModal from './EditItemModal';
import DeleteAlertDialog from './DeleteAlertDialog';
import { useEditList } from '../hooks/useEditList';

export default function MyItemControls({ item }) {
  const { undoPurchase } = useEditList();

  const [ isOpenEdit, setIsOpenEdit ] = useState(false);
  const [ isOpenDelete, setIsOpenDelete ] = useState(false);

  const onOpenEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenEdit(true);
  }
  const onOpenDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenDelete(true);
  }
  const onCloseEdit = () => {
    setIsOpenEdit(false);
  }
  const onCloseDelete = () => {
    setIsOpenDelete(false);
  }

  const receive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.purchased) undoPurchase(item)
  }

  return (
    <>
      <ButtonGroup variant='text' spacing='6'>
        <Button onClick={onOpenEdit} id='editButton'>Edit</Button>
        <Button onClick={onOpenDelete} id='deleteButton'>Delete</Button>
        <Button onClick={receive} id='receivedButton'>Received</Button>
      </ButtonGroup>
      <EditItemModal action='Edit' item={item} isOpen={isOpenEdit} onClose={onCloseEdit}/>
      <DeleteAlertDialog item={item} isOpen={isOpenDelete} onClose={onCloseDelete} />
    </>
  )
}