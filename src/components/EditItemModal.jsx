import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEditList } from '../hooks/useEditList';

  export default function EditItemModal({action, item, isOpen, onClose}) {
    const { submitEdit, addItem } = useEditList();

    const [ name, setName ] = useState(item.name || '');
    const [ category, setCategory ] = useState(item.category || '');
    const [ url, setUrl ] = useState(item.url || '');
    const [ comment, setComment ] = useState(item.comment || '');
    const [ priority, setPriority ] = useState(item.priority || 10);

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeCategory = (e) => setCategory(e.target.value);
    const handleChangeUrl = (e) => setUrl(e.target.value);
    const handleChangeComment = (e) => setComment(e.target.value);
    const handleChangePriority = (e) => setPriority(e.target.value);

    const resetModalState = () => {
        setName("");
        setCategory("");
        setUrl("");
        setComment("");
        setPriority(10);
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
            priority
        });
        resetModalState();
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
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
                        <FormLabel>Comments</FormLabel>
                        <TextField
                            lines="4" 
                            size='md'
                            value={comment}
                            onChange={handleChangeComment}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Set Priority</FormLabel>
                        <TextField
                            select 
                            style={{width: '100%'}}
                            name="priority" 
                            id="priority-select"
                            value={priority}
                            onChange={handleChangePriority}
                        >
                          <MenuItem ></MenuItem>
                          {[1,2,3,4,5,].map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                        </TextField>
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