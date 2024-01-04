// Used for GETTING one or more Documents from a Collection

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'


export const useRTCollection = (c, q, o) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // We put all the fetch logic inside the useEffect, so we get the data
    // as soon as the component that uses the hook mounts
    useEffect(() => {
        let colRef = collection(db, c) // Couldn't the colRef be outside the useEffect?

        if (q && o) { // Check if both a query and an order is passed
            // console.log('Both q & o')
            colRef = query(colRef, where(...q), orderBy(...o)) // Both query and order passed
        } else if (q) { // Only queries passed
            // console.log('Only q')
            colRef = query(colRef, where(...q))
        } else if (o) { // Only ordering passed
            // console.log('Only o')
            colRef = query(colRef, orderBy(...o))
        } else {
            console.log('No queries!')
        }

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
            setError("Something went wrong! Couldn't get the documents")
        })
        // Clean up (unsubscribing to the realtime listener)
        return () => unsub()
    }, [c, q, o])

    return { documents, error }
}
