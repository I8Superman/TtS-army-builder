
import './BuildOption.css'
import { useState } from 'react';

import addIconBlue from '../assets/svgs/add-blue.svg'
import chevronIconBlue from '@/assets/svgs/chevron-blue.svg'

const BuildOption = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="build-option">
            <div className="option-header">
                <p className='option-title'>Add Unit</p>
                <img className='option-toggle' src={isOpen ? chevronIconBlue : addIconBlue} onClick={() => setIsOpen(!isOpen)} alt="drop-down-chevron" />
            </div>
            {isOpen && (
                <form className="add-unit-form">
                    <div className="input-container">
                        <label htmlFor='title'>Unit name:</label>
                        <input
                            id='name'
                            name="name"
                            className='input-text'
                            {...register('name', {
                                required: 'A name is required'
                            })}
                            placeholder='Enter Unit name'
                        />
                        <p className='error'>{errors.title?.message}</p>
                    </div>
                </form>
            )}
        </div>
    )
}

export default BuildOption