import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
} from 'firebase/firestore'

import firebaseConfig from '../lib/firebaseConfig';

initializeApp(firebaseConfig);

export const db = getFirestore()

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const googleSignIn = async () => {
  const { user } = await signInWithGooglePopup();
  return await createUserDocumentFromAuth(user, {items: []});
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
          auth,
          (userAuth) => {
              unsubscribe()
              resolve(userAuth)
          },
          reject
      )
  })
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return
    const { displayName, uid, email, photoURL } = userAuth;

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                uid,
                email,
                // role,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error)
        }
    }
    const userData = userSnapshot.data()
    return {...userData, photoURL}
}

export const getUsers = async () => {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
}

export const updateUser = async (userId, updatedItems) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    items: updatedItems
  })
  return await getUsers()
}