// Add meta data to the army
import './CreateArmyForm.css'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { DevTool } from '@hookform/devtools'
import { useFirestore } from '@/hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore'

import Button from '@/components/Button/Button';

import addIconBlue from '@/assets/svgs/add-blue.svg'
import chevronIconBlue from '@/assets/svgs/chevron-blue.svg'
import InputField from '@/components/forms/InputField/InputField';


const TitleAndDescription = ({ submitAction }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="build-form non-reset">
            <div className="option-header">
                <p className='option-title'>Add title and description</p>
                <img className='option-toggle' src={isOpen ? chevronIconBlue : addIconBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit(submitAction)} noValidate>
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='title'
                        title='Army title:'
                        placeholder='Give your Army a title'
                        options={{ required: 'The Army must be given a title' }}
                    />
                    <InputField
                        element='input'
                        register={register} errors={errors}
                        type='text'
                        name='allies'
                        title='Possible allies:'
                        placeholder='List the possible allies of this army'
                        options={{ required: 'Please list allies' }}
                    />
                    <InputField
                        element='textarea'
                        register={register} errors={errors}
                        name='description.short'
                        title='Description (short):'
                        placeholder='List the possible allies of this army'
                        options={{ required: 'Short text yes' }}
                    />
                    <InputField
                        element='textarea'
                        register={register} errors={errors}
                        name='description.long'
                        title='Description (long):'
                        placeholder='Longer background story'
                        options={{ required: 'Looong test yeah' }}
                    />
                    <Button type='submit' color='submit'>Save Army data</Button>
                </form>
            )}
            <DevTool control={control} />
        </div>

    )
}

export default TitleAndDescription