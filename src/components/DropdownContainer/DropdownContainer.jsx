
import { useState } from 'react';
import './DropdownContainer.css'

const DropdownContainer = ({ color, header, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown-container">
            <div className="option-header">
                <p className='option-title'>{header}</p>
                <img className={isOpen ? 'option-toggle open' : 'option-toggle'} src={`../../svgs/chevron-${color}.svg`} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (children)}
        </div>
    )
}

export default DropdownContainer