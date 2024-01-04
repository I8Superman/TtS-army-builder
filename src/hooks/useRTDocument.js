// Used for GETTING one or more Documents from a Collection

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore'


export const useRTDocument = (c, d) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // We put all the fetch logic inside the useEffect, so we get the data
    // as soon as the component that uses the hook mounts
    useEffect(() => {
        let docRef = doc(db, c, d)
        // if (!d) return // If consumer comp hasn't yet provided the doc

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