
import { useAuthContext } from '../context/AuthContext';

export default function SignInOutButton() {
    const { currentUser, signInOut } = useAuthContext();
    const btnText = currentUser ? 'Sign Out' : 'Sign In';

    return (
      <button onClick={signInOut}>{btnText}</button>
    )
}
