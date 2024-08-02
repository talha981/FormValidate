import React, { useState } from 'react';

function ValidateForm() {
    const [inputValue, setInputValue] = useState({
        fname: '',
        lname: '',
        email: '',
        phone:'',
    });
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        phone:'',
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            fname: '',
            lname: '',
            email: '',
            phone:'',
        };
        
        // Validate inputs
        if (!inputValue.fname.trim()) {
            newErrors.fname = 'First Name is required';
        } else if(inputValue.fname.length > 8){
            newErrors.fname = "Name must be less than 8 characters long."
        }
        if (!inputValue.lname.trim()) {
            newErrors.lname = 'Last Name is required';
        }
        if (!inputValue.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.email)) {
            newErrors.email = 'Email Format is not valid';
        }
        if(!inputValue.phone.trim()){
            newErrors.phone = "Phone Number is required";
        }

        if (newErrors.fname || newErrors.lname || newErrors.email || newErrors.phone) {
            setErrors(newErrors);
            return; 
        }

        // Create FormData and log it
        const data = new FormData();
        data.append('First Name', inputValue.fname);
        data.append('Last Name', inputValue.lname);
        data.append('Email', inputValue.email);
        data.append('Phone Number', inputValue.phone);

        for (let [key, value] of data.entries()) {
            console.log(`${key} : ${value}`);
        }

        // Clear errors
        setErrors({
            fname: '',
            lname: '',
            email: '',
            phone:'',
        });
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
                        className={`w-full px-3 py-2 border ${errors.fname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        onChange={handleInput}
                        value={inputValue.lname}
                        className={`w-full px-3 py-2 border ${errors.lname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Enter Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInput}
                        value={inputValue.email}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        name='phone'
                        onChange={handleInput}
                        value={inputValue.phone}
                        className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

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

export default ValidateForm;
