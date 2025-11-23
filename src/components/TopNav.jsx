
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { Link } from 'react-router-dom';
import SignInOutButton from './SignInOutButton';
import { useAuthContext } from '../context/AuthContext';

export default function TopNav() {
    const { currentUser } = useAuthContext();

    return (
      <>
        <Box sx={{position: 'fixed', top: '0', left: '0', right: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'gray', padding: '0.5rem 2rem', zIndex: '10'}}>
              <Typography variant="h6">FamFam Gift Reg</Typography>
           <Stack direction="row" spacing={2} alignItems={'right'}>
            
              <SignInOutButton /> 
              <Avatar
                size={'sm'}
                src={ currentUser?.photoURL }
              /></Stack>
       </Box>
      </>
    )
}