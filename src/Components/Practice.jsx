import React, { useState } from 'react';

function Practice() {
    const [inputValue, setInputValue] = useState({
        fname: '',
        lname: '',
    });
    const [errors, setErrors] = useState('');

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = '';

        // Validate inputs
        if (!inputValue.fname.trim() || !inputValue.lname.trim()) {
            newErrors = 'Field must be filled';
        }

        if (newErrors) {
            setErrors(newErrors);
            return; // Prevent form submission if there are errors
        }

        const data = new FormData();
        data.append('First Name', inputValue.fname);
        data.append('Last Name', inputValue.lname);

        for (let [key, value] of data.entries()) {
            console.log(`${key} : ${value}`);
        }

        // Clear errors if form submission is successful
        setErrors('');
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Validate Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        name="fname"
                        onChange={handleInput}
                        value={inputValue.fname}
                        className={`w-full px-3 py-2 border ${errors ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        onChange={handleInput}
                        value={inputValue.lname}
                        className={`w-full px-3 py-2 border ${errors ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                </div>
                
                {errors && <p className="text-red-500 text-sm mb-4 text-center">{errors}</p>}
                
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Practice;
