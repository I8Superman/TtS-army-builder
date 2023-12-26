
// 'Make use of' a collection: adding, updating and deleting docs in the collection


import { useReducer, useEffect, useState } from "react"
import { db } from '@/firebase/config'
import { addDoc, updateDoc, collection, doc, deleteDoc } from "firebase/firestore"

// Define initial state for the reducer outside the func, 
// as we don't need it everytime we re-evaluate the component:
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null // ?
}

// Our reducer func (does not hav to be in the component either)
// useReducer is just a state handler for bigger, more complex state (like complex objects):
const firestoreReducer = (state, action) => {
    console.log('Action type: ', action.type)
    switch (action.type) { // Lets us update state based on the action passed
        case 'IS_PENDING': return { ...state, isPending: true }
        case 'ADDED_DOCUMENT': return { ...state, isPending: false, document: action.payload, success: true, error: null } // We also reset the error, in case there was on previously
        case 'UPDATED_DOCUMENT': return { ...state, isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT': return { ...state, isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR': return { ...state, isPending: false, document: null, success: false, error: action.payload }
        default: return state
    }
}

export const useFirestore = (c) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    // The collection we're accessing:
    const colRef = collection(db, c)

    // Func: only dispatch (=update response obj) if not cancelled (= component dismounts) - can wrap all our dispatch calls:
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // Add document:
    const addDocument = async (newDoc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await addDoc(colRef, newDoc)
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
            // Unlike Vue, we handle setting isPending to false in our firestoreReducer func, instead of here
            return addedDocument
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
            console.log(error.message)
        }
    }

    // Update document: 
    const updateDocument = async (docId, update) => {
        dispatch({ type: 'IS_PENDING' })

        let docRef = doc(db, c, docId)
        try {
            const updatedDocument = await updateDoc(docRef, update)
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })
            return updatedDocument
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
            console.log(error.message)
        }
    }

    // Delete document:
    const deleteDocument = async (docId) => {
        let docRef = doc(db, c, docId)

        try {
            const deletedDocument = await deleteDoc(docRef)
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deleteDocument })
            return deletedDocument
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
            console.log(error.message)
        }
    }

    // Cleanup:
    useEffect(() => {
        setIsCancelled(false) // We need to reset the isCancelled state, or it will remain true on re-render
        return () => {
            setIsCancelled(true)
        }
    }, [])

    // Func output:
    return { addDocument, deleteDocument, updateDocument, response }
}
