
import './DisplayArmy.css'
import { useParams } from 'react-router-dom';
import { useRTDocument } from '@/hooks/useRTDocument';

const DisplayArmy = ({ armyList, error }) => {
    // const { army } = useParams();

    // const { document: armyList, error } = useRTDocument('armylists', ['titleUrl', '==', army])

    // Getting the single doc we need from the documents arr (of only that one doc/army list) whenever it is updated:

    // console.log(documents)

    return (
        <div className="display-army">
            {error && <p className='error-message'>{error.message}</p>}
            {!armyList && <p>Getting Army List data ...</p>}
            {armyList && (
                <div className="army-list">
                    <h3>{armyList.id}</h3>
                    <p>{armyList.title}</p>
                </div>
            )}
            {armyList && <div className='unit-list'>
                {armyList.unitList.map((unit) => {
                    return (
                        <div key={unit.name}>
                            <p>{unit.name}</p>
                            <p>{unit.type}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default DisplayArmy