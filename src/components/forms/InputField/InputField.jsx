
import { useEffect } from 'react'
import './InputField.css'

const InputField = ({ element, register, errors, type, name, title, placeholder, options }) => {

    // const nestedErrors = errors[name]

    const nestedErrors = name.split('.').reduce((errorObj, key) => errorObj && errorObj[key], errors);

    // const vehicleTypes = data.reduce((obj, vehicleType) => { // obj is the 'total' = what we 'reduce' the data to
    //     if (!obj[vehicleType]) { // Check if this elem has been iterated before
    //         obj[vehicleType] = 0; // If not, then create a property/key for it in the initial obj and set its value to 0
    //     }
    //     obj[vehicleType]++; // Now add 1 to the value of the key
    //     return obj // We must return the obj. It will serve as the initial value for the next iteration of the func
    // }, {})

    // useEffect(() => {
    //     console.log(errors)
    // }, [errors])

    return (
        <div className="input-container">
            <label htmlFor={name}>{title}</label>
            {/* Regular input field: */}
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

export default InputField