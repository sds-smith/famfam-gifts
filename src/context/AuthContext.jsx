import { useContext, createContext, useState } from "react";
import { googleSignIn, signOutUser } from "../utils/firebase.utils";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useLocalStorage('currentUser');
    const [ userError, setUserError ] = useState(null);

    const signIn = () => googleSignIn()
        .then(signInResponse => {
            if (signInResponse) {
                setCurrentUser(signInResponse)
            } else {
                setUserError('You are not a registered user of this App. Please contact the Administrator.')
            }
        });
    const signOut = () => signOutUser().then(() => setCurrentUser(''));
    const signInOut = () => Boolean(currentUser) ? signOut() : signIn();

    const value = {
        currentUser,
        userError,
        signInOut
    }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}