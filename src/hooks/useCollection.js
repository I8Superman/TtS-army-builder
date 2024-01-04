// Used for GETTING one or more Documents from a Collection

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'


export const useCollection = (c, q, o) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    console.log('useCollection')
    // We put all the fetch logic inside the useEffect, so we get the data
    // as soon as the component that uses the hook mounts
    useEffect(() => {
        if (!isCancelled) {
            const fetchData = async () => {
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

                try {
                    const querySnapshot = await getDocs(colRef);
                    let results = []
                    querySnapshot.forEach(doc => {
                        results.push({ ...doc.data(), id: doc.id })
                    })
                    // Update values:
                    setDocuments(results)
                    setError(null) // Cause if we got the data, there was no error
                } catch (err) {
                    console.log(err.message)
                    setDocuments(null) // If something went wrong, we dont want any documents
                    setError("Something went wrong! Couldn't get the documents")
                }

            }
            fetchData()
        }

        // Clean up (abort fetch if unmounted)
        setIsCancelled(false)
        return () => () => setIsCancelled(true)
    }, [c, q, o, isCancelled])

    return { documents, error }
}
