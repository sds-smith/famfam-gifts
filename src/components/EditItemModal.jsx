import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEditList } from '../hooks/useEditList';

  export default function EditItemModal({action, item, isOpen, onClose}) {
    const { submitEdit, addItem } = useEditList();

    const [ name, setName ] = useState(item.name || '');
    const [ category, setCategory ] = useState(item.category || '');
    const [ url, setUrl ] = useState(item.url || '');
    const [ comment, setComment ] = useState(item.comment || '');
    const [ price, setPrice ] = useState(item.price || '');

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeCategory = (e) => setCategory(e.target.value);
    const handleChangeUrl = (e) => setUrl(e.target.value);
    const handleChangeComment = (e) => setComment(e.target.value);
    const handleChangePrice = (e) => setPrice(e.target.value);

    const resetModalState = () => {
        setName("");
        setCategory("");
        setUrl("");
        setComment("");
        setPrice("");
    }

    const submit = {
        Edit: submitEdit,
        Add: addItem
    }

    function handleSubmit(e) {
        e.preventDefault();
        submit[action]({
            id: item.id,
            name,
            category,
            url,
            comment,
            price
        });
        resetModalState();
        onClose();
    }

    return (
        <Dialog fullScreen open={isOpen} onClose={onClose}>
            <DialogTitle>{`${action} ${item.name || 'Item'}`}</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <FormControl>
                        <FormLabel>Item Name</FormLabel>
                        <TextField 
                            size='md'
                            value={name}
                            onChange={handleChangeName}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Item Category</FormLabel>
                        <TextField 
                            size='md'
                            value={category}
                            onChange={handleChangeCategory}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Item URL</FormLabel>
                        <TextField 
                            size='md'
                            value={url}
                            onChange={handleChangeUrl}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Item Price</FormLabel>
                        <TextField 
                            size='md'
                            value={price}
                            onChange={handleChangePrice}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Comments</FormLabel>
                        <TextField
                            lines="4" 
                            size='md'
                            value={comment}
                            onChange={handleChangeComment}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
  }