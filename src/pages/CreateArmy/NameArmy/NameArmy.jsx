
import './NameArmy.css'
import Page from '@/components/Page/Page'
import InputField from '@/components/forms/Inputfield/Inputfield'

import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useFirestore } from '@/hooks/useFirestore'
import { serverTimestamp } from 'firebase/firestore'
import Button from '@/components/Button/Button'
import { useEffect, useState } from 'react'


const NameArmy = () => {
    const { addDocument, response } = useFirestore('armylists')
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate()
    const location = useLocation();
    const { setting } = location.state;

    useEffect(() => {
        if (setting) {
            console.log('rerender', setting)
        }
    }, [setting])

    const isCreatable = watch('title')

    const onSubmit = async (formValues) => {
        console.log('Submiting title', formValues.title)
        const titleToUrl = formValues.title.toLowerCase().split(' ').join('-')
        console.log(titleToUrl)
        const addedTimeStamp = { ...formValues, createdAt: serverTimestamp(), urlTitle: titleToUrl }
        addDocument(addedTimeStamp)
        navigate(`./${titleToUrl}`, { state: { setting: setting } })
    }

    return (
        <Page title={'Choose Army List title'} color='dark-purple'>
            <h1>Army name here</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    element='input'
                    register={register} errors={errors}
                    type='text'
                    name='title'
                    title='Army List title:'
                    placeholder='Give your Army List a title'
                    options={{ required: 'You must give the Army List a title before proceeding' }}
                />
                {response.error && <p className='error-message'>{response.error.message}</p>}
                {response.isPending && <h3>Creating Army List...</h3>}
                <Button type='submit' disabled={isCreatable ? false : true}>Create Army List</Button>
            </form>
        </Page>

    )
}

export default NameArmy