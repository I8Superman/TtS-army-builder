// Add meta data to the army

import './CreateArmyForms.css'

import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { DevTool } from '@hookform/devtools'

import Button from '@/components/Button/Button';
import DropdownContainer from '../../DropdownContainer/DropdownContainer';

import addIconBlue from '@/assets/svgs/add-blue.svg'
// import InputField from '@/components/forms/InputFields/InputField';
// import ControlledInputField from '@/components/forms/InputFields/ControlledInputField';

const TitleAndDescription = ({ submitAction, response, armyList }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { isPending, error: updateErr } = response

    useEffect(() => {
        if (armyList) { // Object.entries returns an objects properties 
            Object.entries(armyList).forEach(([fieldName, value]) => {
                // Check if you want to set the value for a specific field (doesnt work with nested data as )
                if (fieldName === 'title' || fieldName === 'allies' || fieldName === 'setting') {
                    setValue(fieldName, value);
                }
                // Manually add nested values (don't know how to do it in a loop as nested keys are not recognised!):
                if (armyList.description.short) {
                    setValue('description.short', armyList.description.short);
                }
                if (armyList.description.long) {
                    setValue('description.long', armyList.description.long);
                }
            });
        }
    }, [armyList, setValue]);

    console.log('Title child render')

    return (
        <DropdownContainer border='blue' bgColor='ultralight-purple' header='Edit title and description'>
            <form onSubmit={handleSubmit(submitAction)} noValidate>
                <div className="input-container">
                    <label htmlFor='title'>Army List title:</label>
                    <Controller
                        name='title'
                        placeholder='Give your Army a title'
                        defaultValue=''
                        control={control}
                        rules={{ required: 'The Army List must have a title' }}
                        render={({ field }) => <input {...field} className='input-field' id='title' />}
                    />
                    {errors.title && <p className="error-message">{errors.title.message}
                    </p>}
                </div>
                <div className="input-container">
                    <label htmlFor='setting'>Setting:</label>
                    <Controller
                        name='setting'
                        placeholder='In which setting is the Army List used?'
                        defaultValue=''
                        control={control}
                        rules={{ required: 'A setting is required' }}
                        render={({ field }) => <input {...field} className='input-field' id='setting' />}
                    />
                    {errors.setting && <p className="error-message">{errors.setting.message}
                    </p>}
                </div>
                <div className="input-container">
                    <label htmlFor='allies'>Possible Allies:</label>
                    <Controller
                        name='allies'
                        placeholder='List the possible allies for the army, comma seperated'
                        defaultValue={[]}
                        control={control}
                        render={({ field }) => <input {...field} className='input-field' id='allies' />}
                    />
                    {errors.allies && <p className="error-message">{errors.allies.message}
                    </p>}
                </div>
                <div className="input-container">
                    <label htmlFor='description-short'>Description (short):</label>
                    <Controller
                        name='description.short'
                        placeholder='Give your Army a title'
                        defaultValue=''
                        control={control}
                        render={({ field }) => <textarea {...field} className='input-field' id='description-short' rows='3' />}
                    />
                    {errors.description?.short && <p className="error-message">{errors.description.short.message}
                    </p>}
                </div>
                <div className="input-container">
                    <label htmlFor='description-long'>Description (long):</label>
                    <Controller
                        name='description.long'
                        placeholder='Give your Army a title'
                        defaultValue=''
                        control={control}
                        render={({ field }) => <textarea {...field} className='input-field' id='description-long' rows='3' />}
                    />
                    {errors.description?.long && <p className="error-message">{errors.description.long.message}
                    </p>}
                </div>
                {updateErr && <p className='error-message'>{updateErr.message}</p>}
                <Button type='submit' color='submit'>Save Army data</Button>
            </form>
            <DevTool control={control} />
        </DropdownContainer>

    )
}

export default TitleAndDescription