// Used for GETTING one or more Documents from a Collection

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'


export const useRTCollection = (c) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // We put all the fetch logic inside the useEffect, so we get the data
    // as soon as the component that uses the hook mounts
    useEffect(() => {
        let colRef = collection(db, c) // Couldn't the colRef be outside the useEffect?

        const unsub = onSnapshot(colRef, snapshot => {
            let results = [] // temporary arr to store and treat data
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            // Update values
            setDocuments(results)
            setError(null) // Cause if we got the data, there was no error
        }, (err) => {
            console.log(err.message)
            setDocuments(null) // If something went wrong, we dont want any documents
            setError("Something went wrong! Couldn't get the data.")
        })
        // Clean up (unsubscribing to the realtime listener)
        return () => unsub()
    }, [c])

    return { documents, error }
}


// The Vue way:

// import { ref, watchEffect } from 'vue'

// // Firebase imports
// import { db } from '../firebase/config'
// import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

// const getCollection = (c, q, o) => { // c = collection name. q is any queries we pass. o is ordering
//     const documents = ref(null)
//     const error = ref(null)
//     const isPending = ref(false)
//     console.log(q)
//     console.log(o)

//     // Collection reference:
//     let colRef = collection(db, c) // c is the collection we pass to this composable
//     // If any queries are passed, change the collection to a query instead:
//     if (q && o) { // Check if both a query and an order is passed
//         console.log('Both q & o')
//         colRef = query(colRef, where(...q), orderBy(...o)) // Both query and order passed
//     } else if (q) { // Only queries passed
//         console.log('Only q')
//         colRef = query(colRef, where(...q))
//     } else if (o) { // Only ordering passed
//         console.log('Only o')
//         colRef = query(colRef, orderBy(...o))
//     } else {
//         console.log('No queries!')
//     }
//     // onSnapshot is a real time listener that will run, wheever the data changes
//     const unsub = onSnapshot(colRef, snapshot => { // onSnapshot instead of getDocs
//         let results = [] // temporary arr to store and treat data
//         snapshot.docs.forEach(doc => {
//             results.push({ ...doc.data(), id: doc.id })
//         })
//         // Update values
//         documents.value = results
//         error.value = null // Cause if we got the data, there was no error
//     }, (err) => {
//         console.log(err.message)
//         documents.value = null // If something went wrong, we dont want any documents
//         error.value = "Something went wrong! Didn't get chat data."
//     })
//     // Wathcing for onInvalidate -> fires when the component where the getCollection func is being used unmounts 
//     // (when we leave the chat window by logging out)
//     // When that happens, we call the unsub var above, causing the listener to stop.
//     // If we dont unsubscribe, onSnapshot will keep running in the background, even if we're logged out
//     // Another onSnapshot listener will be set up every time we log in, resulting in more and more listeners running at the same time
//     watchEffect((onInvalidate) => {
//         onInvalidate(() => unsub())
//     })
//     return { documents, error, isPending } // Return the documents and error refs so they can be accessed in other places
// }