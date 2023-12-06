
import { useState } from 'react'
import './ArmyForm.css'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function ArmyForm() {
    const location = useLocation()
    const { list } = location.state

    const rhf = useForm();
    console.log(rhf);

    const [armyData, setArmyData] = useState({
        name: '',
        period: '',
        unitNumber: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(armyData);
        console.log('submitted!');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArmyData((prevData) => ({ ...prevData, [name]: value }))
        console.log(armyData)
    }

    const resetForm = () => {
        setArmyData({
            name: '',
            period: '',
            unitNumber: 0
        })
    }

    return (
        <div className="army-form page">
            <h3>Create {list} Army List</h3>
            <div className="army-form page">
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Army List title:</span>
                        <input
                            name="name"
                            type="text"
                            onChange={handleChange}
                            value={armyData.name}
                        />
                    </label>
                    <label>
                        <span>Time period:</span>
                        <input
                            name="period"
                            type="text"
                            onChange={handleChange}
                            value={armyData.period}
                        />
                    </label>
                    <label>
                        <span># of units:</span>
                        <input
                            name="unitNumber"
                            type="number"
                            onChange={handleChange}
                            value={armyData.unitNumber}
                        />
                    </label>
                    <button>Submit form</button>
                    <button onClick={resetForm}>Reset Form</button>
                </form>
            </div>
        </div>
    )
}
