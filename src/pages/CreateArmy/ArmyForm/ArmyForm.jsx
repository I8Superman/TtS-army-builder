
import './ArmyForm.css'
import { useLocation } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

// Icons

import plusSquareBlue from '@/assets/svgs/add-blue.svg'

import { useState } from 'react'
import Page from '@/components/Page/Page'

import TitleAndDescription from '@/components/forms/TitleAndDescription/TitleAndDescription'

export default function ArmyForm() {
    const location = useLocation();
    const { list } = location.state;

    // const { register, control, handleSubmit, formState: { errors } } = useForm();

    // const [isOpen, setIsOpen] = useState(false);

    // const onSubmit = (formValues) => {
    //     console.log('Form submitted', formValues);
    // }

    return (
        <Page title={list} actions={['print', 'copy', 'see']} color='dark-purple'>
            <TitleAndDescription />


            {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="input-container">
                    <label htmlFor='title'>Army List title:</label>
                    <input
                        id='title'
                        name="title"
                        className='input-text'
                        {...register('title', {
                            required: 'A title for the army is required'
                        })}
                        placeholder='Enter Army List title'
                    />
                    <p className='error'>{errors.title?.message}</p>
                </div>

                <div className="build-functions">
                    <div className="build-option army-details">
                        <div className="option-header">
                            <p className='option-title'>Add title & description</p>
                            <img className='option-toggle' src={plusSquareBlue} alt="drop-down-chevron" />
                        </div>
                    </div>
                    <div className="build-option army-details">
                        <div className="option-header">
                            <p className='option-title'>Add army option</p>
                            <img className='option-toggle' src={plusSquareBlue} alt="drop-down-chevron" />
                        </div>
                    </div>
                    <div className="build-option">
                        <div className="option-header">
                            <p className='option-title'>Add Generals and Heroes</p>
                            <img className='option-toggle' src={plusSquareBlue} alt="drop-down-chevron" />
                        </div>
                    </div>
                    <div className="add-option build-option">
                        <div className="option-header">
                            <p className='option-title'>Add Unit</p>
                            <img className='option-toggle' src={plusSquareBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
                        </div>
                        {isOpen && (
                            <form className="add-unit-form">
                                <div className="input-container">
                                    <label htmlFor='title'>Unit name:</label>
                                    <input
                                        id='name'
                                        name="name"
                                        className='input-text'
                                        {...register('name', {
                                            required: 'A name is required'
                                        })}
                                        placeholder='Enter Unit name'
                                    />
                                    <p className='error'>{errors.title?.message}</p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor='allies'>Possible allies:</label>
                    <input
                        id='allies'
                        name="allies"
                        className='input-text'
                        {...register('allies')}
                        placeholder='Comma separated allies??'
                    />
                    <p className='error'>{errors.allies?.message}</p>
                </div>
                <div className="input-container">
                    <label htmlFor='short-description'>Short description:</label>
                    <textarea
                        id='short-description'
                        name="short-description"
                        className='text-area'
                        {...register('short')}
                        placeholder='Short text about what army, geography and time period the Army List covers'
                    />
                    <p className='error'>{errors.short?.message}</p>
                </div>
                <div className="input-container">
                    <label htmlFor='long-description'>Long description:</label>
                    <textarea
                        id='long-description'
                        name="long-description"
                        className='text-area'
                        {...register('long')}
                        placeholder='Write a longer description of the army and its background here'
                        rows='3'
                    />
                    <p className='error'>{errors.short?.message}</p>
                </div>


                <button type="submit">Submit form</button>
                }
            </form > */}
            {/* <DevTool control={control} /> */}

            {/* </div > */}
        </Page>
    )
}
