
import './ArmyForm.css'

import { useParams } from 'react-router-dom'
import { isEqual } from 'lodash'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'

// Icons
// import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import Page from '@/components/Page/Page'
import TitleAndDescriptionForm from '@/components/forms/CreateArmyForms/TitleAndDescriptionForm'
import AddNewUnitForm from '@/components/forms/CreateArmyForms/AddNewUnitForm'
import DisplayArmy from '@/components/DisplayArmy/DisplayArmy';
import DropdownContainer from '../../../components/DropdownContainer/DropdownContainer';
import { useRTDocument } from '../../../hooks/useRTDocument';

export default function ArmyForm() {
    // Get the doc with query from url params:
    const { army: armyId } = useParams()

    // ['titleUrl', '==', army]
    const { document: armyList, error } = useRTDocument('armylists', armyId)

    const { updateDocument, response } = useFirestore('armylists')

    const hasFormDataNotChanged = (formValues) => { // Checks to see if any new data was actually entered. 
        const updatedDataKeys = Object.keys(formValues); // Get the keys for use with reduce func below
        const similarOldKeys = Object.entries(armyList).reduce((result, entry) => { // Make an arr of key/value pairs and reduce them to a temporary object we can compare with the object of new data (entry[0] = key, entry[1] = value)
            if (updatedDataKeys.includes(entry[0])) {
                result[entry[0]] = entry[1]
            }
            return result
        }, {})
        const compare = isEqual(formValues, similarOldKeys) // lodash isEqual compares 2 complex data types (here: objects) in depth
        return compare
    }

    const onSubmit = async (formValues) => {
        // Abort update if no data was actually changed (if you click the save button aciidentally fx):
        if (hasFormDataNotChanged(formValues)) {
            console.log('No new values entered - update aborted!')
            return
        }
        // Otherwise perform the update:
        const withUpdateTimestamp = { ...formValues, updatedAt: serverTimestamp() }
        await updateDocument(armyList.id, withUpdateTimestamp);
    }

    return (
        <Page title={armyList ? armyList.title : 'Getting title...'} actions={['print', 'copy', 'see']} color='dark-purple'>
            <DropdownContainer border='blue' bgColor='ultralight-purple' header='Edit title and description'>
                <TitleAndDescriptionForm submitAction={onSubmit} response={response} data={armyList} prefill={true} />
            </DropdownContainer>
            <DropdownContainer border='blue' bgColor='white' header='Add new unit'>
                <AddNewUnitForm submitAction={onSubmit} response={response} />
            </DropdownContainer>
            <DisplayArmy armyList={armyList} error={error} />
        </Page>
    )
}
