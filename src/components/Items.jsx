import { useState } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import ItemCard from './ItemCard';
import EditItemModal from './EditItemModal';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';

export default function Items({ items }) {
    const { currentUser } = useAuthContext();
    const selectedFamilyMember = useFamilyMemberParam();

  const [ isOpenEdit, setIsOpenEdit ] = useState(false);

  const onOpenEdit = () => setIsOpenEdit(true)
  const onCloseEdit = () => setIsOpenEdit(false)

    const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

    return (
        <>
            <Stack spacing={4} align='start'>
                { userSelectedSelf && <Button variant="contained" onClick={onOpenEdit}>Add Item</Button> }
                <Stack spacing={4}>
                    { items?.map(item => (
                        <ItemCard key={item.name} item={item} />
                    ))}
                </Stack>
            </Stack>
            <EditItemModal action='Add' item={{}} isOpen={isOpenEdit} onClose={onCloseEdit} />
        </>
      )
}
