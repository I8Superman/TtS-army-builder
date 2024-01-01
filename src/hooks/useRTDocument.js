// Used for GETTING one or more Documents from a Collection

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore'


export const useRTDocument = (c, d) => {
    if (!d) return
    console.log('useDocument getting: ', c, ' and: ', d)
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // We put all the fetch logic inside the useEffect, so we get the data
    // as soon as the component that uses the hook mounts
    useEffect(() => {
        let docRef = doc(db, c, d)

        const unsub = onSnapshot(docRef, doc => {
            if (doc.data()) { // Check if the doc actually exists - will be null if it doesnt
                setDocument({ ...doc.data(), id: doc.id })
                setError(null) // If we get the doc, there is no error
            } else { // If no data is returned
                setError("The Army doesn't seem to exist")
            }
        }, (err) => {
            console.log(err.message)
            setDocument(null) // If something went wrong, we dont want any documents
            setError("Something went wrong! Couldn't get the document")
        })
        // Clean up (unsubscribing to the realtime listener)
        return () => unsub()
    }, [c, d])

    return { document, error }
}


// The Vue way:


// Firebase imports
// import { db } from '../firebase/config'
// import { doc, onSnapshot } from 'firebase/firestore'

// const getDocument = (c, d) => {
//     const document = ref(null)
//     const error = ref(null)
//     // Collection reference:
//     let docRef = doc(db, c, d) // c is the collection we pass to this composable. d is the doc id (sent from the component that uses this composable)

//     // onSnapshot is a real time listener that will run, wheever the data changes
//     const unsub = onSnapshot(docRef, (doc) => {
//         // We use an if-else statement instead of a try-catch block here.
//         if (doc.data()) { // Check if the doc actually exists - will be null if it doesnt
//             document.value = { ...doc.data(), id: doc.id }
//             error.value = null // If we get the doc, there is no error
//         } else { // If no data is returned
//             error.value = "The playlist doesn't seem to exist"
//         }
//     }, (err) => { // Even if we dont use try-catch, there is still an error returned from the onSnapshot method
//         console.log(err.message)
//         document.value = null // If something went wrong, we dont want any documents
//         error.value = "Something went wrong! Didn't get chat data."
//     })

//     // Dont know what this is yet. Something that stops the listener
//     watchEffect((onInvalidate) => {
//         onInvalidate(() => unsub())
//     })
//     return { document, error } // The result must be returned
// }

// export default getDocument