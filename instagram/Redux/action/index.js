import { USER_STATE_CHANGE } from '../constants'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' 

const auth = getAuth()
const db = getFirestore()

export function fetchUser(){
    return(async ( dispacth ) => {
        const docRef = doc( db, "user", auth.currentUser.uid )
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            dispacth({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
        }
        else {
            console.log('does not')
        }
    })
}