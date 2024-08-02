import React, { useState } from 'react';

function SignUp() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const inputHandle = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('input', inputValue);

    for (let [key, value] of formData.entries()) {
      console.log(`$[key] : $[value]`);
    }

    // Update the submitted value state
    setSubmittedValue(inputValue);
  };

  return (
    <>
      <h1>SignUp</h1>
      <form  onSubmit={handleSubmit}>
        <label>Enter Your Name</label>
        <input
        
          type="text"
          id="input"
          placeholder="Enter Name"
          value={inputValue}
          onChange={inputHandle}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Conditionally render the submitted value */}
      {submittedValue && (
        <div>
          <h2>Submitted Value:</h2>
          <p>{submittedValue}</p>
        </div>
      )}
    </>
  );
}

export default SignUp;
