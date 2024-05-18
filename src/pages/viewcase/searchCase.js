import React, { useState, useEffect } from 'react';

function CaseList() {
    const [cases, setCases] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        // Fetch data based on selected option
        if (selectedOption) {
            fetchCases(selectedOption);
        }
    }, [selectedOption]);

    const fetchCases = async (option) => {
        try {
            const response = await fetch(`/cases/${option}`);
            const data = await response.json();
            setCases(data);
        } catch (error) {
            console.error('Error fetching cases:', error);
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };


    return (
        <div>
            <h2>Options:</h2>
            <div>
                <button onClick={() => handleOptionChange('pending')}>Pending Cases</button>
                <button onClick={() => handleOptionChange('resolved')}>Resolved Cases</button>
                <button onClick={() => handleOptionChange('upcoming')}>Upcoming Cases</button>
            </div>

            <h2>Cases:</h2>
            <ul>
                {cases.map((caseItem) => (
                    <li key={caseItem._id}>{caseItem.def_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CaseList;
