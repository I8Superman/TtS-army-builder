
import { useState } from 'react';
import './DropdownContainer.css'

const DropdownContainer = ({ border, bgColor, header, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`dropdown-container ${border} bg-${bgColor}`}>
            <div className="option-header">
                <p className='option-title'>{header}</p>
                <img className={isOpen ? 'option-toggle open' : 'option-toggle'} src={`../../svgs/chevron-${border}.svg`} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (children)}
        </div>
    )
}

export default DropdownContainer