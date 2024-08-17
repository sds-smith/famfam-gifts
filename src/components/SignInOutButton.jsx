
import { Button } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

export default function SignInOutButton() {
    const { currentUser, signInOut } = useAuthContext();
    const btnText = currentUser ? 'Sign Out' : 'Sign In';

    return (
      <Button variant='ghost' onClick={signInOut}>{btnText}</Button>
    )
}
