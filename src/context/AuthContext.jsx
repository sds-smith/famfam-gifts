import { useState, useContext, createContext } from "react";
import { googleSignIn, signOutUser } from "../utils/firebase.utils";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const signIn = () => googleSignIn().then(setCurrentUser);
    const signOut = () => signOutUser().then(() => setCurrentUser(null));
    const signInOut = () => Boolean(currentUser) ? signOut() : signIn();

    const value = {
        currentUser,
        signInOut
    }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}