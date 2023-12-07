
import './ArmyForm.css'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export default function ArmyForm() {
    const location = useLocation()
    const { list } = location.state

    // const [armyData, setArmyData] = useState({
    //     name: '',
    //     period: '',
    //     unitNumber: 0,
    //     country: ''
    // })

    const { register, control, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = (formValues) => {
        console.log('Form submitted', formValues);
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setArmyData((prevData) => ({ ...prevData, [name]: value }))
    //     console.log(armyData)
    // }

    // const resetForm = () => {
    //     setArmyData({
    //         name: 'name here',
    //         period: 'time period',
    //         unitNumber: 0
    //     })
    // }

    return (
        <div className="army-form page">
            <h3>Create {list} Army List</h3>
            {/* noValidate overrides the html validation so we can make our own */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label>
                    <span>Army List title:</span>
                    <input
                        name="name"
                        {...register('name', {
                            required: 'Name is required'
                        })}
                    // placeholder="Army name here"
                    />
                    <p className='error'>{errors.name?.message}</p>
                </label>
                <label>
                    <span>Time period:</span>
                    <input
                        name="period"
                        {...register('period', {
                            required: 'A time period is needed!'
                        })}
                    // placeholder="Time perod"
                    />
                    <p className='error'>{errors.period?.message}</p>
                </label>
                <label>
                    <span># of units:</span>
                    <input
                        name="unitNumber"
                        {...register('unitNumber', {
                            required: 'also required'
                        })}
                    // placeholder="Number of units"
                    />
                    <p className='error'>{errors.unitNumber?.message}</p>
                </label>
                <label>
                    <span>State:</span>
                    <select name="country"
                        {...register('country')}
                    >
                        <option>Sparta</option>
                        <option>Greece</option>
                        <option>Persia</option>
                        <option>France</option>
                    </select>
                </label>
                <button type="submit">Submit form</button>
                {/* <button onClick={resetForm}>Reset Form</button> */}
            </form>
            <DevTool control={control} />
        </div>
    )
}
