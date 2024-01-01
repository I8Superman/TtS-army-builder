
import './ArmyForm.css'

import { useLocation } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'

// import { useRTDocument } from '@/hooks/useRTDocument';

// Icons
import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import { useEffect, useState } from 'react'

import Page from '@/components/Page/Page'

import TitleAndDescriptionForm from '@/components/forms/CreateArmyForms/TitleAndDescriptionForm'
import AddNewUnitForm from '@/components/forms/CreateArmyForms/AddNewUnitForm'

export default function ArmyForm() {

    const { addDocument, updateDocument, response } = useFirestore('armylists')
    const [currentArmy, setCurrentArmy] = useState(null);

    const location = useLocation();
    const { setting, title } = location.state;

    // const { document, error } = useRTDocument('armies', currentArmy)

    useEffect(() => {
        console.log('logging currentArmy: ', currentArmy)
    }, [currentArmy])

    const onSubmit = async (formValues) => {
        console.log(formValues)
        if (!currentArmy) {
            console.log('Not created yet')
            const formValuesWithCreatedTimestamp = { ...formValues, createdAt: serverTimestamp() }
            console.log('Form submitted', formValuesWithCreatedTimestamp);
            const res = await addDocument(formValuesWithCreatedTimestamp);
            setCurrentArmy(res.id)

        } else {
            console.log('Created, now updating!')
            const formValuesWithUpdatedTimestamp = { ...formValues, updatedAt: serverTimestamp() }
            console.log('Form updated', formValuesWithUpdatedTimestamp);
            await updateDocument(formValuesWithUpdatedTimestamp);
        }
    }

    return (
        <Page title={title} actions={['print', 'copy', 'see']} color='dark-purple'>
            <TitleAndDescriptionForm submitAction={onSubmit} />
            <AddNewUnitForm submitAction={onSubmit} />
            <div className="display-army">
                {/* {error && <p className='error-message'>{error.message}</p>} */}
                {/* {document && (
                    <div className="document">
                        <h3>{document.id}</h3>
                        <p>{document.title}</p>
                        <br />
                        <p>{document.descriptions.short}</p>
                    </div>
                )}*/}
            </div>
        </Page>
    )
}
