
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import { Link } from 'react-router-dom';
import SignInOutButton from './SignInOutButton';
import { useAuthContext } from '../context/AuthContext';

export default function TopNav() {
    const { currentUser } = useAuthContext();

    return (
      <>
        <Box px={4}>
           <Stack spacing={8} alignItems={'center'}>
              <Box>FamFam Gift Reg</Box>
            </Stack>
              <SignInOutButton /> 
              <Avatar
                size={'sm'}
                src={ currentUser?.photoURL }
              />
       </Box>
      </>
    )
}