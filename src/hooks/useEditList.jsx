
import { useAuthContext } from "../context/AuthContext";
import { useFamilyMembersContext } from "../context/FamilyMembersContext";
import { useFamilyMemberParam } from "./useFamilyMemberParam";
import { updateUser } from "../utils/firebase.utils";

export function useEditList() {
    const { currentUser } = useAuthContext();
    const { updateFamilyMembers } = useFamilyMembersContext();
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
        const updatedItems = items.filter(itemToKeep => itemToKeep.id !== item.id)
        updatedItems.push(updatedItem)
        updatedItems.sort((a,b) => a.id - b.id)

        const updatedUsersArray = await updateUser(memberId, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const submitEdit = async (newItem) => {
        const updatedItems = items.filter(itemToKeep => itemToKeep.id !== newItem.id)
        updatedItems.push(newItem)
        updatedItems.sort((a,b) => a.id - b.id)
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const addItem = async (newItem) => {
        const updatedItems = [...items, {...newItem, id: items.length}]
        updatedItems.sort((a,b) => a.id - b.id)
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    const deleteItem = async (item) => {
        const updatedItems = items.filter(itemToMatch => itemToMatch.id !== item.id)
        const updatedUsersArray = await updateUser(uid, updatedItems)
        updateFamilyMembers(updatedUsersArray);
    }

    return {
        markItemPurchased,
        submitEdit,
        addItem,
        deleteItem
    }
}