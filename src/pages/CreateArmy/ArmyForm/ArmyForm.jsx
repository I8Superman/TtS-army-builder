
import './ArmyForm.css'

import { useLocation, useParams } from 'react-router-dom'
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'
import { useRTCollection } from '@/hooks/useRTCollection';

// Icons
// import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import { useEffect, useState } from 'react'
import Page from '@/components/Page/Page'
import TitleAndDescriptionForm from '@/components/forms/CreateArmyForms/TitleAndDescriptionForm'
import AddNewUnitForm from '@/components/forms/CreateArmyForms/AddNewUnitForm'

export default function ArmyForm() {
    const { updateDocument, response } = useFirestore('armylists')
    const { isPending, error: updateErr } = response

    const { army } = useParams();
    const location = useLocation();
    const { title } = location.state;
    const [armyList, setArmyList] = useState(null)

    // Get the doc with query from params:
    const { documents, error: fetchErr } = useRTCollection('armylists', ['urlTitle', '==', army])
    // Getting the single doc we need from the documents arr (of only that one doc/army list) whenever it is updated:
    useEffect(() => {
        if (documents) {
            setArmyList(documents[0])
        }
    }, [documents])

    const updateArmyList = async (formValues) => {
        console.log('formValues: ', formValues)
        const withTimestamp = { ...formValues, updatedAt: serverTimestamp() }
        console.log('withTimestamp: ', withTimestamp);
        await updateDocument(armyList.id, withTimestamp);
    }

    return (
        <Page title={title} actions={['print', 'copy', 'see']} color='dark-purple'>
            <TitleAndDescriptionForm submitAction={updateArmyList} response={response} armylist={armyList} />
            <AddNewUnitForm submitAction={updateArmyList} response={response} />
            <div className="display-army">
                {fetchErr && <p className='error-message'>{fetchErr.message}</p>}
                {!armyList && <p>Getting Army List data ...</p>}
                {armyList && (
                    <div className="army-list">
                        <h3>{armyList.id}</h3>
                        <p>{armyList.title}</p>
                    </div>
                )}
                {armyList?.unitList && <div className='unit-list'>
                    {armyList.unitList.map((unit) => {
                        return <p key={unit.name}>{unit.name}</p>
                    })}
                </div>}
            </div>
        </Page>
    )
}
