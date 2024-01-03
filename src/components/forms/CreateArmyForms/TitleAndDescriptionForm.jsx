// Add meta data to the army

import './CreateArmyForm.css'

import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { DevTool } from '@hookform/devtools'

import Button from '@/components/Button/Button';

import addIconBlue from '@/assets/svgs/add-blue.svg'
import chevronIconBlue from '@/assets/svgs/chevron-blue.svg'
// import InputField from '@/components/forms/InputFields/InputField';
// import ControlledInputField from '@/components/forms/InputFields/ControlledInputField';

const TitleAndDescription = ({ submitAction, response, armylist }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const { isPending, error: updateErr } = response

    useEffect(() => {
        if (armylist) {
            setValue('title', armylist.title)
            setValue('setting', armylist.setting)
            setValue('allies', armylist.allies)
            setValue('description.short', armylist.description.short)
            setValue('description.long', armylist.description.long)
        }// Doing it with a function:
        // Object.entries(armylist).forEach(([fieldName, value]) => {
        //     // Check if you want to set the value for a specific field
        //     if (fieldName === 'title' || fieldName === 'allies' || fieldName === 'description.short' || fieldName === 'description.long') {
        //         setValue(fieldName, value);
        //     }
        //     // Add more conditions as needed for other fields
        // });
    }, [armylist, setValue]);

    return (
        <div className="build-form non-reset">
            <div className="option-header">
                <p className='option-title'>Edit title and description</p>
                <img className='option-toggle' src={isOpen ? chevronIconBlue : addIconBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit(submitAction)} noValidate>
                    <div className="input-container">
                        <label htmlFor='title'>Army List title:</label>
                        <Controller
                            name='title'
                            id='title'
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
                            placeholder='List the possible allies for the army'
                            defaultValue=''
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
                            rules={{ required: 'The Army List must have a title' }}
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
                            rules={{ required: 'The Army List must have a title' }}
                            render={({ field }) => <textarea {...field} className='input-field' id='description-long' rows='3' />}
                        />
                        {errors.description?.long && <p className="error-message">{errors.description.long.message}
                        </p>}
                    </div>
                    {updateErr && <p className='error-message'>{updateErr.message}</p>}
                    <Button type='submit' color='submit'>Save Army data</Button>
                </form>
            )}
            <DevTool control={control} />
        </div>

    )
}

export default TitleAndDescription