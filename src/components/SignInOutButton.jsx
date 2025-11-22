
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/AuthContext';

export default function SignInOutButton() {
    const { currentUser, signInOut } = useAuthContext();
    const btnText = currentUser ? 'Sign Out' : 'Sign In';

    return (
      <Button sx={{color: 'black'}} onClick={signInOut}>{btnText}</Button>
    )
}
