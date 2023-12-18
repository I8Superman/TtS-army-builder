// Takes: title, type (of input elem), placeholder, initial value
import './InputField.css'

const InputField = ({ register, errors, type, data, validation }) => {

    console.log(data)

    return (
        <div className="input-container">
            <label htmlFor={data}>Possible allies:</label>
            <input
                className='input-field'
                type={type}
                name={data}
                id={data}
                placeholder='List the possible allies for the army'
                {...register(data, validation)}
            />
            <p className="input-error-message">{errors.allies?.message}</p>
        </div>
    )
}

export default InputField