
import { useAuthContext } from "../context/AuthContext";
import { useFamilyMembersContext } from "../context/FamilyMembersContext";
import { useFamilyMemberParam } from "./useFamilyMemberParam";
import { updateUser, updateCombinedUser } from "../utils/firebase.utils";

export function useEditList() {
    const { currentUser } = useAuthContext();
    const { familyMembers, updateFamilyMembers } = useFamilyMembersContext();
    const { uid: memberId, items } = useFamilyMemberParam();

    const { displayName, uid } = currentUser;

    const markItemPurchased = async (item) => { 
        const updatedItem = Object.assign(item, {
            purchased: true,
            purchasedBy: {
                displayName,
                uid
            }
        })

        const itemToReplace = items.find(i => i.id === updatedItem.id);
        const idx = items.indexOf(itemToReplace);
        const updatedItems = items.toSpliced(idx, 1, updatedItem);

        const updatedUsersArray = await updateUser(memberId, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const undoPurchase = async (item) => { 
        if ( uid === item.purchasedBy.uid ) {
            const updatedItem = Object.assign(item, {
                purchased: false,
                purchasedBy: null
            })

            const itemToReplace = items.find(i => i.id === updatedItem.id);
            const idx = items.indexOf(itemToReplace);
            const updatedItems = items.toSpliced(idx, 1, updatedItem);
    
            const updatedUsersArray = await updateUser(memberId, updatedItems)
            updateFamilyMembers(updatedUsersArray);
        }
    }

    const submitEdit = async (newItem) => {
        const itemToReplace = items.find(item => item.id === newItem.id);
        const idx = items.indexOf(itemToReplace);
        const updatedItems = items.toSpliced(idx, 1, newItem);
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const addItem = async (newItem) => {
        const id = items.reduce((acc, curr) => Math.max(acc, curr.id), 0) + 1;
        const updatedItems = [...items, {...newItem, id}]
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const deleteItem = async (item) => {
        const updatedItems = items.filter(itemToMatch => itemToMatch.id !== item.id)
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const saveSortedList = async (newList) => {
        const updatedUsersArray = await updateUser(uid, newList);
        console.log({updatedUsersArray})
        updateFamilyMembers(updatedUsersArray);
    }

    const combineUsers = async (firstUser, secondUser) => {
        const first = familyMembers.find(fm => fm.uid === firstUser)
        const second = familyMembers.find(fm => fm.uid === secondUser)
        const { displayName, email, uid } = first;
        const { createdAt, items, role } = second;
        const userToUpdate = { displayName, email, uid, createdAt, items, role }
        console.log({userToUpdate})
        const updatedUsersArray = await updateCombinedUser(uid, userToUpdate)
        updateFamilyMembers(updatedUsersArray)
    }

    return {
        markItemPurchased,
        undoPurchase,
        submitEdit,
        addItem,
        deleteItem,
        saveSortedList,
        combineUsers
    }
}