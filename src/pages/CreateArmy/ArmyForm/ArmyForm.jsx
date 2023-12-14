
import './ArmyForm.css'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import printIcon from '@/assets/svgs/printer-dark-purple.svg'
import eyeIcon from '@/assets/svgs/eye-dark-purple.svg'
import copyIcon from '@/assets/svgs/copy-dark-purple.svg'

export default function ArmyForm() {
    const location = useLocation();
    const { list } = location.state;

    const { register, control, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = (formValues) => {
        console.log('Form submitted', formValues);
    }

    return (
        <div className="army-form page">
            <h3 className='title'>Create {list} Army List</h3>
            <div className="actions">
                <img className="icon" src={printIcon} alt="" />
                <img className="icon" src={copyIcon} alt="" />
                <img className="icon" src={eyeIcon} alt="" />
            </div>
            <div className="content">
                {/* noValidate overrides the html validation so we can make our own */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="input-container">
                        <label htmlFor='title'>Army List title:</label>
                        <input
                            id='title'
                            name="title"
                            className='input-text'
                            {...register('titla', {
                                required: 'A title for the army is required'
                            })}
                            placeholder='Enter Army List title'
                        />
                        <p className='error'>{errors.title?.message}</p>
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
                {/* <DevTool control={control} /> */}
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti aperiam doloremque pariatur, adipisci perferendis consequatur, sint incidunt dicta totam nulla libero? Officiis at minus facere, delectus exercitationem impedit libero nemo?
                    Quod nemo aliquam nostrum aperiam optio rem porro veritatis, expedita voluptates illum doloribus eligendi dolorum? Quasi sit debitis qui nemo, hic repellat eos architecto tempora consectetur, voluptas expedita voluptatum dolores?
                    Consectetur ducimus accusantium suscipit accusamus. Facere voluptatem dolor vel architecto, nostrum ipsa distinctio aliquid fuga fugiat nulla officia excepturi autem assumenda debitis saepe nam esse cupiditate. Possimus temporibus ipsa maiores.
                </p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti aperiam doloremque pariatur, adipisci perferendis consequatur, sint incidunt dicta totam nulla libero? Officiis at minus facere, delectus exercitationem impedit libero nemo?
                    Quod nemo aliquam nostrum aperiam optio rem porro veritatis, expedita voluptates illum doloribus eligendi dolorum? Quasi sit debitis qui nemo, hic repellat eos architecto tempora consectetur, voluptas expedita voluptatum dolores?
                    Consectetur ducimus accusantium suscipit accusamus. Facere voluptatem dolor vel architecto, nostrum ipsa distinctio aliquid fuga fugiat nulla officia excepturi autem assumenda debitis saepe nam esse cupiditate. Possimus temporibus ipsa maiores.
                </p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti aperiam doloremque pariatur, adipisci perferendis consequatur, sint incidunt dicta totam nulla libero? Officiis at minus facere, delectus exercitationem impedit libero nemo?
                    Quod nemo aliquam nostrum aperiam optio rem porro veritatis, expedita voluptates illum doloribus eligendi dolorum? Quasi sit debitis qui nemo, hic repellat eos architecto tempora consectetur, voluptas expedita voluptatum dolores?
                    Consectetur ducimus accusantium suscipit accusamus. Facere voluptatem dolor vel architecto, nostrum ipsa distinctio aliquid fuga fugiat nulla officia excepturi autem assumenda debitis saepe nam esse cupiditate. Possimus temporibus ipsa maiores.
                </p>
                <br /><br /><br />
            </div>
        </div>
    )
}
