
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

  export default function UserAlertDialog({userError, isOpen, onClose}) {
  
    return (
      <>
        <Dialog
          open={isOpen}
          onClose={onClose}
        >
              <DialogTitle fontSize='lg' fontWeight='bold'>
                {userError}
              </DialogTitle>
  
              <DialogContent>
                If you are a user of this App, you may need to log in with a different email.
              </DialogContent>
  
              <DialogActions>
                <Button onClick={onClose}>
                  Close
                </Button>
              </DialogActions>
\        </Dialog>
      </>
    )
  }