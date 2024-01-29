// Add meta data to the army

import './CreateArmyForms.css'

import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react';

import Button from '@/components/Button/Button';

const TitleAndDescriptionForm = ({ submitAction, stopSubmit, response, data, prefill }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { isPending, error: updateErr } = response

    useEffect(() => { // Prefill func
        if (data && prefill) { // Object.entries returns an objects properties 
            Object.entries(data).forEach(([fieldName, value]) => {
                // Check if you want to set the value for a specific field (doesnt work with nested data as )
                if (fieldName === 'title' || fieldName === 'allies' || fieldName === 'setting' || fieldName === 'description') { // You can only use the first level of data here (not fx description.short), but setting that will automatically set any nested data.
                    setValue(fieldName, value);
                }
            })
            // Manually add nested values (don't know how to do it in a loop as nested keys are not recognised!):
        }
    }, [data, setValue, prefill]);

    return (
        <form onSubmit={handleSubmit(submitAction)} noValidate>
            <div className="input-container">
                <label htmlFor='title'>Army List title:</label>
                <Controller
                    name='title'
                    placeholder='Give your Army a title'
                    defaultValue=''
                    control={control}
                    rules={{ required: 'The Army List must have a title' }}
                    render={({ field }) => <input {...field} className='input-field' id='title' onKeyDown={stopSubmit} />}
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
                    render={({ field }) => <input {...field} className='input-field' id='setting' onKeyDown={stopSubmit} />}
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
                    render={({ field }) => <input {...field} className='input-field' id='allies' onKeyDown={stopSubmit} />}
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
                    render={({ field }) => <textarea {...field} className='textarea' id='description-short' rows='3' onKeyDown={stopSubmit} />}
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
                    render={({ field }) => <textarea {...field} className='textarea' id='description-long' rows='3' onKeyDown={stopSubmit} />}
                />
                {errors.description?.long && <p className="error-message">{errors.description.long.message}
                </p>}
            </div>
            {updateErr && <p className='error-message'>{updateErr.message}</p>}
            <Button type='submit' color='submit' disabled={isPending ? true : false}>Save Army data</Button>
        </form>
    )
}

export default TitleAndDescriptionForm