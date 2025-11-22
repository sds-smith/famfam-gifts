import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Items from '../components/Items';
import EditItemModal from '../components/EditItemModal';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';

export default function FamilyMember() {
    const { currentUser } = useAuthContext();
    const selectedFamilyMember = useFamilyMemberParam();
    const { displayName, items } = selectedFamilyMember;

    const itemsByCategory = useMemo(() => items?.reduce((acc, curr) => ({
      ...acc,
      [curr.category || "No Category"] : [...(acc[curr.category || "No Category"] || []), curr]
    }), {}) || {}, [items]);

    const allCategories = useMemo(() => Object.keys(itemsByCategory), [itemsByCategory]);

    const [ selectedCategories, setSelectedCategories ] = useState([]);
    const [ isOpenEdit, setIsOpenEdit ] = useState(false);

    const onOpenEdit = () => setIsOpenEdit(true)
    const onCloseEdit = () => setIsOpenEdit(false)

    const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

    const handleSelect = (e) => setSelectedCategories(e.target.value);

    return (
      <>
        <Link to='/home' style={{textDecoration: 'none', color: 'black'}}>{'< Home'}</Link>
        <Typography variant="h4">{displayName}</Typography>
        { userSelectedSelf && <Button variant="contained" onClick={onOpenEdit}>Add Item</Button> }
        <FormControl fullWidth sx={{marginTop: '1rem'}}>
          <InputLabel id="demo-multiple-checkbox-label" >Select Categories</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-checkbox-label"
            multiple
            value={selectedCategories}
            onChange={handleSelect}
            input={<OutlinedInput label="Select Categories" />}
          >
            { allCategories.length > 1 && allCategories.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        { !selectedCategories.length 
          ? <Items key={'all'} category={"All Items"} items={items} />
          : selectedCategories.map(cat => (
              <Items key={cat} category={cat} items={itemsByCategory[cat]} />
          ))
        }
        <EditItemModal action='Add' item={{}} isOpen={isOpenEdit} onClose={onCloseEdit} />
      </>
    )
}
