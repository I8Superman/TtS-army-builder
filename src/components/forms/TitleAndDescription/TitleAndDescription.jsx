
import './CreateArmyForm.css'

import { useForm } from 'react-hook-form'
import { useState } from 'react';

import addIconBlue from '@/assets/svgs/add-blue.svg'
import chevronIconBlue from '@/assets/svgs/chevron-blue.svg'
import InputField from '@/components/forms/InputField/InputField';

const TitleAndDescription = () => {
    const { register, control, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = (formValues) => {
        console.log('Form submitted', formValues);
    }

    return (
        <div className="build-form">
            <div className="option-header">
                <p className='option-title'>Add title and description</p>
                <img className='option-toggle' src={isOpen ? chevronIconBlue : addIconBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="input-container">
                        <label htmlFor="title">Army title:</label>
                        <input
                            className='input-field'
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Give your Army a title'
                            {...register('title', {
                                required: 'A title is a must'
                            })}
                        />
                        <p className="input-error-message">{errors.title?.message}</p>
                    </div>
                    <InputField
                        register={register}
                        errors={errors}
                        type='text'
                        data='allies'
                        validation={{ required: 'Must be filled out' }}
                    />

                    <button type='submit'>Submit form</button>
                </form>
            )}
        </div>

    )
}

export default TitleAndDescription