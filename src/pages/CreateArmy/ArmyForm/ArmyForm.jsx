
import './ArmyForm.css'
import { useLocation } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'

import { useRTCollection } from '@/hooks/useRTCollection';
// Icons

import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import { useEffect, useState } from 'react'

import Page from '@/components/Page/Page'

import TitleAndDescription from '@/components/forms/CreateArmyForms/TitleAndDescription'
import AddNewUnit from '@/components/forms/CreateArmyForms/AddNewUnit'

export default function ArmyForm() {
    const location = useLocation();
    const { list } = location.state;

    const { addDocument, updateDocument, response } = useFirestore('armies')
    const [docCreated, setDocCreated] = useState(false);

    const { documents, error } = useRTCollection('armies')

    useEffect(() => {
        console.log(documents)
    }, [documents])

    const onSubmit = async (formValues) => {
        if (!docCreated) {
            console.log('Not created yet')
            const formValuesWithCreatedTimestamp = { ...formValues, createdAt: serverTimestamp() }
            console.log('Form submitted', formValuesWithCreatedTimestamp);
            await addDocument(formValuesWithCreatedTimestamp);
            setDocCreated(true)
        } else {
            console.log('Created, now updating!')
            const formValuesWithUpdatedTimestamp = { ...formValues, updatedAt: serverTimestamp() }
            console.log('Form updated', formValuesWithUpdatedTimestamp);
            await updateDocument(formValuesWithUpdatedTimestamp);
        }
    }

    return (
        <Page title={list} actions={['print', 'copy', 'see']} color='dark-purple'>
            <TitleAndDescription submitAction={onSubmit} />
            <AddNewUnit submitAction={onSubmit} />
            <div className="display-army">
                {error && <p className='error-message'>{error.message}</p>}
                {documents && documents.map((list) => (
                    <div className="army" key={list.id}>
                        <h3>{list.id}</h3>
                        <p>Yhis is a single army list</p>
                    </div>
                ))}
            </div>
        </Page>
    )
}
