
import { useAuthContext } from "../context/AuthContext";
import { useFamilyMembersContext } from "../context/FamilyMembersContext";
import { useFamilyMemberParam } from "./useFamilyMemberParam";
import { updateUser } from "../utils/firebase.utils";

export function useMarkPurchased() {
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

    return {
        markItemPurchased
    }
}