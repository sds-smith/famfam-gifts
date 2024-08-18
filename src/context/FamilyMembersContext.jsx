import { useState, useMemo, useContext, useEffect, createContext } from "react";
import { useAuthContext } from './AuthContext';
import { getUsers } from "../utils/firebase.utils";

export const FamilyMembersContext = createContext(null);

export const FamilyMembersProvider = ({children}) => {
    const { currentUser } = useAuthContext();
    const [ familyMembers, setFamilyMembers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const getFamilyMembers = async () => {
        setLoading(true);
        getUsers()
            .then(setFamilyMembers)
            .catch(({message}) => setError(message))
            .finally(() => setLoading(false))
    }

    const updateFamilyMembers = (newFamilyMembersArray) => setFamilyMembers(newFamilyMembersArray);

    useEffect(() => {
        if (currentUser && !familyMembers && !loading && !error) getFamilyMembers();
    }, [currentUser, familyMembers, loading, error]);

    const value = {
        familyMembers,
        updateFamilyMembers
    }

    return <FamilyMembersContext.Provider value={value} >{children}</FamilyMembersContext.Provider>
}

export function useFamilyMembersContext() {
    return useContext(FamilyMembersContext);
}