import React, { useState } from 'react';

function SecureInput() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate input
        if (!inputValue.trim()) {
            setError('Input cannot be empty');
            return;
        }

        // Basic validation to prevent SQL injection-like patterns
        const forbiddenPatterns = /['";]|--|SELECT|INSERT|DELETE|UPDATE|DROP|;|--|\\|{|}/i;
        if (forbiddenPatterns.test(inputValue)) {
            setError('Invalid characters detected');
            return;
        }

        // Clear error and handle form submission
        setError('');
        // Process input value
        console.log('Submitted value:', inputValue);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Secure Input</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Input</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInput}
                        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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

export default SecureInput;
