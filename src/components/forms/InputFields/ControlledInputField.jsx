
import { Controller } from 'react-hook-form';
import './InputField.css'

const ControlledInputField = ({ controller, element, register, errors, type, name, title, placeholder, options }) => {
    const nestedErrors = name.split('.').reduce((errorObj, key) => errorObj && errorObj[key], errors);


    return (
        <div className="input-container">
            <label htmlFor={name}>{title}</label>
            {/* Regular input field: */}
            {element === 'input' && <Controller
                className='textarea'
                name={name}
                control={control}

                id={name}
            />}

            {element === 'input' && <input
                className='input-field'
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                {...register(name, options)}
            />}


            {/* Textarea: */}
            {element === 'textarea' && <textarea
                className='textarea'
                name={name}
                id={name}
                placeholder={placeholder}
                rows='3'
                {...register(name, options)}
            />}

            {nestedErrors && <p className="error-message">{nestedErrors.message}</p>}
        </div>
    )
}

export default ControlledInputField


//     <label>
//     First Name:
// <Controller
//     name="firstName"
//     control={control}
//     defaultValue="" // Set default value or leave it empty
//     render={({ field }) => <input {...field} />}
// />
//       </label>