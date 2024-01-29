// Add a condition for the army list
import './CreateArmyForms.css'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useEffect, useState, useRef } from 'react';

import Button from '../../Button/Button';
import { arrayUnion } from 'firebase/firestore';
import xRoundedRed from '../../../assets/svgs/x-rounded-red.svg';
import addRoundedBlue from '../../../assets/svgs/add-rounded-blue.svg';
import { reduceRight } from 'lodash';

const AddArmyOptionForm = ({ submitAction, stopSubmit, response, data, prefill, existingData }) => {
    const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            choices: [
                { choice: '' },
                { choice: '' },
                { choice: '' }
            ]
        }
    });
    const { fields, remove, append } = useFieldArray({ control, name: 'choices' })

    const { isPending, error: updateErr } = response;

    const placeholders = ['Fx: Before 350 BC', 'Fx: Between 350 - 280 BC', 'Fx: After 280 BC']

    // console.log(placeholders[0].placeholder, placeholders[2].placeholder)

    let renderCount = useRef(0);

    useEffect(() => {
        const current = renderCount.current + 1
        renderCount.current = current
    }, [])

    // const checkChoiceValues = watch()


    const checkExistence = (value) => { // Validation for condition.name (avoid duplets)
        if (!existingData) return true;
        if (existingData) { // = if the armyList already has a unitList with at least 1 unit
            return existingData.some(condition => condition.name === value) ? false : true;
        }
    }

    const onSubmit = (formValues) => {
        console.log('submitValues: ', formValues)
        // Reduce choices from objects to strings, so they are easier to acces:
        const reducedArr = formValues.choices.map(item => {
            return item.choice
        })
        const updatedFormValues = { ...formValues, choices: reducedArr }
        submitAction({ conditions: arrayUnion(updatedFormValues) })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <button>{renderCount.current}</button>
            <p className='dark-purple form-info'>Add a time period or other designator to create variants and conditions for the Army List.</p>
            <div className="input-container">
                <label htmlFor='title'>Option title:</label>
                <Controller
                    name='title'
                    defaultValue=''
                    control={control}
                    rules={{
                        required: 'A condition must have a title.',
                        validate: { // The value of the field is automatically passed to any validate func:
                            titleAlreadyExists: value => checkExistence(value) || 'A condition with this title already exists. Edit that condition instead.'
                        }
                    }}
                    render={({ field }) => <input {...field} className='input-field' id='title' placeholder='Give your condition a title' />}
                />
                {errors?.title && <p className="error-message">{errors.title.message}</p>}
            </div>
            <p className='dark-purple sm input-header'>Type:</p>
            <div className="input-container">
                <Controller
                    name='type'
                    control={control}
                    defaultValue='exclusive'
                    rules={{
                        required: 'A type must be selected.'
                    }}
                    render={({ field }) => {
                        return (
                            <>
                                <label htmlFor='exclusive' className='input-radio'>
                                    <input {...field} type='radio' value='exclusive' id='exclusive' defaultChecked={field.value === 'exclusive'} />
                                    Mutually exclusive
                                </label>
                                <label htmlFor='multiple' className='input-radio'>
                                    <input {...field} type='radio' value='multiple' id='multiple' />
                                    Multiple can be selected
                                </label>
                            </>
                        )
                    }
                    }
                />
                {errors?.type && <p className="error-message">{errors.type.message}</p>}
            </div>

            <p className='dark-purple sm input-header'>Possible choices (empty choices will no be saved). Please list them in logical order, top to bottom:</p>
            {fields.map((field, index) => {
                // console.log('index: ', index)
                return (
                    <div className="input-container condition-choice" key={field.id}>
                        <label htmlFor={`choice${index}`}>#
                            <input
                                className='input-field'
                                id={`choice${index}`}
                                {...register(`choices.${index}.choice`, {
                                    validate: {
                                        hasLength: value => value.length > 0 || 'Please enter a choice or delete this input-field.'
                                    }
                                })}
                                placeholder={placeholders[index]}
                            />
                            <img className='delete-choice' src={xRoundedRed} alt="delete-button" onClick={() => remove(index)} />
                        </label>
                        {/* Notice the optional chaining here with array bracket botation!: */}
                        {errors.choices?.[index]?.choice && <p className="error-message">{errors.choices[index].choice.message}</p>}
                    </div>
                )
            })}
            {/* <div className="input-container">
                <label htmlFor='type'>Type:</label>
                <Controller
                    name='type'
                    defaultValue=''
                    control={control}
                    rules={{ required: 'What type of unit are you adding?' }}
                    render={({ field }) => <input {...field} className='input-field' id='type' placeholder='Auxilliary, Light, Cavalry etc.' />}
                />
                {errors.type && <p className="error-message">{errors.type.message}</p>}
            </div> */}
            {isPending && <p>Saving condition...</p>}
            {updateErr && <p className='error-message'>{updateErr.message}</p>}
            <img className='add-choice' src={addRoundedBlue} alt="add-choice-button" onClick={() => append({ choice: '' })} />
            <Button type='submit' color='submit'>Add condition to Army List</Button>
        </form>
    )
}
export default AddArmyOptionForm

