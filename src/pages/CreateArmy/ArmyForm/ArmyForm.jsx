
import './ArmyForm.css'

import { useParams, useNavigate } from 'react-router-dom'
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'

// Icons
// import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import Page from '@/components/Page/Page'
import TitleAndDescriptionForm from '@/components/forms/CreateArmyForms/TitleAndDescriptionForm'
import AddNewUnitForm from '@/components/forms/CreateArmyForms/AddNewUnitForm'
import DisplayArmy from '@/components/DisplayArmy/DisplayArmy';
import { useRTDocument } from '../../../hooks/useRTDocument';

export default function ArmyForm() {
    // Get the doc with query from url params:
    const { army } = useParams()

    // ['titleUrl', '==', army]
    const { document: armyList, error } = useRTDocument('armylists', army)

    console.log('ArmyForm render')

    const { updateDocument, response } = useFirestore('armylists')


    const updateArmyList = async (formValues) => {
        const withUpdateTimestamp = { ...formValues, updatedAt: serverTimestamp() }
        await updateDocument(armyList.id, withUpdateTimestamp);
    }

    return (
        <Page title={armyList ? armyList.title : 'Getting title...'} actions={['print', 'copy', 'see']} color='dark-purple'>
            <TitleAndDescriptionForm submitAction={updateArmyList} response={response} armyList={armyList} />
            <AddNewUnitForm submitAction={updateArmyList} response={response} />
            <DisplayArmy armyList={armyList} error={error} />
        </Page>
    )
}
