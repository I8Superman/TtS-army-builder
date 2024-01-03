// Add a single unit type to the army
import './CreateArmyForm.css'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';

import addIconBlue from '@/assets/svgs/add-blue.svg'
import chevronIconBlue from '@/assets/svgs/chevron-blue.svg'
import InputField from '@/components/forms/InputFields/InputField';
import Button from '../../Button/Button';
import { arrayUnion } from 'firebase/firestore';

const AddNewUnit = ({ submitAction, response }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const { isPending, error: updateErr } = response

    const onSubmit = (formValues) => {
        submitAction({ unitList: arrayUnion(formValues) })
    }
    return (
        <div className="build-form">
            <div className="option-header">
                <p className='option-title'>Add new Unit</p>
                <img className='option-toggle' src={isOpen ? chevronIconBlue : addIconBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='name'
                        title='Name:'
                        placeholder='Give your unit a name'
                        options={{ required: 'A unit must have a name' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='type'
                        title='Type:'
                        placeholder='Auxilliary, Light, Cavalry etc.'
                        options={{ required: 'What type of unit are you adding?' }}
                    />
                    {/* Should weapons be an array??? */}
                    {/* <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='weapons'
                        title='Weapons:'
                        placeholder='Primary weapons, if specified.'
                        options={{}}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='extraWeapons'
                        title='Extra weapons:'
                        placeholder='Bow, Sling etc.'
                        options={{}}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='size'
                        title='Size:'
                        placeholder='Regular, Deep, Small etc.'
                        options={{}}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='quality'
                        title='Quality:'
                        placeholder='Regular, Veteran or Raw'
                        options={{ required: 'Unit must have a quality' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='abilities'
                        title='Abilities: '
                        placeholder='Any keyword special rules'
                        options={{}}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='amount.min'
                        title='Min.:'
                        placeholder='Enter minimum number of units'
                        options={{ required: 'A min number must be specified' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='amount.max'
                        title='Max.:'
                        placeholder='Enter maximum number of units'
                        options={{ required: 'A max number must be specified' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='cost'
                        title='Cost:'
                        placeholder='How many points does the unit cost?'
                        options={{ required: 'A Points Cost must be entered' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='hits'
                        title='Hits:'
                        placeholder='How many hits can the unit take?'
                        options={{ required: 'How many hits can the unit take?' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='save'
                        title='Save:'
                        placeholder="Enter a number ('+' not necessary)"
                        options={{ required: 'A Save number must be specified' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='vm'
                        title='VM:'
                        placeholder='Victory Medals lost if the unit is eliminated'
                        options={{ required: 'Enter number of Victory Medals' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='vp'
                        title='VP:'
                        placeholder='How many Victory Points is the unit worth?'
                        options={{ required: 'Enter number of Victory Points' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='ammo'
                        title='Ammo:'
                        placeholder='How much ammo does the unit have?'
                        options={{ required: 'The unit must have some ammo' }}
                    /> */}
                    {isPending && <p>Saving unit...</p>}
                    {updateErr && <p className='error-message'>{updateErr.message}</p>}
                    <Button type='submit' color='submit'>Add unit to Army List</Button>
                </form>
            )}
            <DevTool control={control} />
        </div>
        // Name, unit type, weapon, extra weapon, size, quality, abilities, amount.minimum, amount.maximum, cost, Hits, Save, VM, VP, Ammo (obj), ammo-type 
    )
}

export default AddNewUnit