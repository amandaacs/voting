import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Names = () => {
  const navigate = useNavigate();
  const [names, setNames] = useState(Array(10).fill(''));
  const [submittedNames, setSubmittedNames] = useState([]);

  const handleChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };

  const handleSubmit = () => {
    const filteredNames = names.filter(name => name.trim() !== '');
    
    localStorage.setItem('submittedNames', JSON.stringify(filteredNames)); // Store names in localStorage
    navigate('/voting'); // Navigate to the voting page
  };

  return (
    <div  className="container">
      <h1>Costume Voting</h1>
      {names.map((name, index) => (
        <input
          key={index}
          type="text"
          value={name}
          onChange={event => handleChange(index, event)}
          placeholder={`Name ${index + 1}`}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      
    </div>
  );
};

export default Names;
