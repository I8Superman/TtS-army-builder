// Add a single unit type to the army
import './CreateArmyForms.css'

import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react';

import Button from '../../Button/Button';
import { arrayUnion } from 'firebase/firestore';

const AddUpgradeForm = ({ submitAction, stopSubmit, response, data, prefill, existingData }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { isPending, error: updateErr } = response


    // Func to prefill the form with data if needed:
    useEffect(() => {
        if (data && prefill) {
            console.log('Form prefill logic')
        }
    }, [data, prefill, setValue])

    const checkExistence = (value) => { // Validation for unit.name (avoid duplets)
        console.log('value: ', value)
        if (!existingData) return true;
        if (existingData) { // = if the unit alreday has an upgrade/downgrade with this name
            return existingData.some(unit => unit.name === value) ? false : true;
        }
    }

    const onSubmit = (formValues) => {
        console.log(formValues)
        // arrayUnion() is a Firestore method that atomically adds an element to an arr data value
        // Here we add the unit to the existing arr of units in the unitList property
        // submitAction({ unitList: arrayUnion(formValues) })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={stopSubmit} noValidate>
            <p className='dark-purple sm input-header'>Is it an upgrade or a downgrade?</p>
            <div className="input-container">
                <Controller
                    name='upgradeType'
                    control={control}
                    defaultValue='exclusive'
                    rules={{
                        required: 'An upgrade type must be selected.'
                    }}
                    render={({ field }) => {
                        return (
                            <>
                                <label htmlFor='upgrade' className='input-radio'>
                                    <input {...field} type='radio' value='upgrade' id='upgrade' defaultChecked={field.value === 'upgrade'} />
                                    Upgrade
                                </label>
                                <label htmlFor='downgrade' className='input-radio'>
                                    <input {...field} type='radio' value='downgrade' id='downgrade' />
                                    Downgrade
                                </label>
                            </>
                        )
                    }
                    }
                />
                {errors?.type && <p className="error-message">{errors.type.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='name'>Upgrade  (if different):</label>
                <Controller
                    name='name'
                    defaultValue=''
                    control={control}
                    rules={{
                        validate: { // The value of the field is automatically passed to any validate func:
                            unitAlreadyExists: value => checkExistence(value) || 'A unit with this name already exists. Edit that unit instead.'
                        }
                    }}
                    render={({ field }) => <input {...field} className='input-field' id='name' placeholder='Give your unit a name.' />}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='type'>Upgrade type (if different):</label>
                <Controller
                    name='type'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='type' placeholder='Auxilliary, Light, Cavalry etc.' />}
                />
                {errors.type && <p className="error-message">{errors.type.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='weapons'>Upgrade weapons (if different):</label>
                <Controller
                    name='weapons'
                    defaultValue={[]}
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='weapons' placeholder='Primary weapons, if specified. Comma-seperated.' />}
                />
                {errors.weapons && <p className="error-message">{errors.weapons.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='extra-weapons'>Upgrade extra weapons (if any or different):</label>
                <Controller
                    name='extraWeapons'
                    defaultValue={[]}
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='extra-weapons' placeholder='Bow, Sling etc. Comma-seperated.' />}
                />
                {errors.extraWeapons && <p className="error-message">{errors.extraWeapons.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='size'>Upgrade size (if different):</label>
                <Controller
                    name='size'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='size' placeholder='Regular, Deep, Small etc.' />}
                />
                {errors.size && <p className="error-message">{errors.size.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='quality'>Upgrade quality (if different):</label>
                <Controller
                    name='quality'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='quality' placeholder='Regular, Veteran or Raw.' />}
                />
                {errors.quality && <p className="error-message">{errors.quality.message}</p>}
            </div>
            <div className="input-container">
                <label htmlFor='abilities'>Upgrade abilities (if different):</label>
                <Controller
                    name='abilities'
                    defaultValue={[]}
                    control={control}
                    render={({ field }) => <input {...field} className='input-field' id='abilities' placeholder='Special abilites or rules. Comma-seperated.' />}
                />
                {errors.abilities && <p className="error-message">{errors.abilities.message}</p>}
            </div>
            <p className='dark-purple sm input-header'>Enter min, max, cost, hits etc. for the upgrade/downgrade if different from the original unit:</p>
            <div className="multiple-inputs">
                <div className="input-container">
                    <label htmlFor='min'>Min.:</label>
                    <Controller
                        name='amount.min'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='min' placeholder='# units.' />}
                    />

                </div>
                <div className="input-container">
                    <label htmlFor='max'>Max.:</label>
                    <Controller
                        name='amount.max'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='max' placeholder='# units.' />}
                    />

                </div>
                <div className="input-container">
                    <label htmlFor='cost'>Cost.:</label>
                    <Controller
                        name='cost'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='cost' placeholder='# Pts.' />}
                    />

                </div>
            </div>
            <div className="mulitple-errors">
                {errors.amount?.min && <p className="error-message">{errors.amount.min.message}</p>}
                {errors.amount?.max && <p className="error-message">{errors.amount.max.message}</p>}
                {errors.cost && <p className="error-message">{errors.cost.message}</p>}
            </div>
            <div className="multiple-inputs">
                <div className="input-container">
                    <label htmlFor='hits'>Hits:</label>
                    <Controller
                        name='hits'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='hits' placeholder='# hits.' />}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='save'>Save:</label>
                    <Controller
                        name='save'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='save' placeholder='# save' />}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='vm'>VM:</label>
                    <Controller
                        name='vm'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='vm' placeholder='# vm' />}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='vp'>VP:</label>
                    <Controller
                        name='vp'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='vp' placeholder='# vp' />}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='ammo'>Ammo:</label>
                    <Controller
                        name='ammo'
                        defaultValue=''
                        control={control}
                        rules={{
                            valueAsNumber: true
                        }}
                        render={({ field }) => <input {...field} type='number' className='input-field' id='ammo' placeholder='# ammo' />}
                    />
                </div>
            </div>
            <div className="mulitple-errors">
                {errors.hits && <p className="error-message">{errors.hits.message}</p>}
                {errors.save && <p className="error-message">{errors.save.message}</p>}
                {errors.vm && <p className="error-message">{errors.vm.message}</p>}
                {errors.vp && <p className="error-message">{errors.vp.message}</p>}
                {errors.ammo && <p className="error-message">{errors.ammo.message}</p>}
            </div>
            {isPending && <p>Saving unit...</p>}
            {updateErr && <p className='error-message'>{updateErr.message}</p>}
            <Button type='submit' color='submit'>Add upgrade/downgrade to unit</Button>
        </form>
    )
}

export default AddUpgradeForm