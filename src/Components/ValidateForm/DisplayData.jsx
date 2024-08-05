import React, { useEffect, useState } from 'react';

function DisplayData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    setUserData(data);
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Stored Data:</h2>
          <p>First Name: {userData.fname}</p>
          <p>Last Name: {userData.lname}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Gender: {userData.gender}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DisplayData;
