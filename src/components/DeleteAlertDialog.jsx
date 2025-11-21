
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEditList } from '../hooks/useEditList';

  export default function DeleteAlertDialog({item, isOpen, onClose}) {
    const { deleteItem } = useEditList();

    const handleDelete = () => {
        deleteItem(item);
        onClose();
    };
  
    return (
      <>
        <Dialog
          open={isOpen}
          onClose={onClose}
        >
              <DialogTitle fontSize='lg' fontWeight='bold'>
                {`Delete ${item.name}`}
              </DialogTitle>
  
              <DialogContent>
                Are you sure? You can't undo this action afterwards.
              </DialogContent>
  
              <DialogActions>
                <Button onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} >
                  Delete
                </Button>
              </DialogActions>
        </Dialog>
      </>
    )
  }