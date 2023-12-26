
import './Button.css'

const Button = ({ type, func, children, color }) => {

    return (
        <button
            type={type}
            className={`button ${color}`}
            onClick={func}
        >
            {children}
        </button>
    )
}

export default Button