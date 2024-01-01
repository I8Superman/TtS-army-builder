
import './Button.css'

const Button = ({ type, func, children, color, disabled }) => {

    return (
        <button
            type={type}
            className={color ? `button ${color}` : 'button'}
            onClick={func}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button