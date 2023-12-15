
import './Button.css'

const Button = ({ type, func, children }) => {


    return (
        <button
            className="button"
            onClick={func}
        >
            {children}
        </button>
    )
}

export default Button