import React, { useState } from 'react';

const PriorityList = ({ onPriorityChange }) => {
    const [priority, setPriority] = useState('low');

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        onPriorityChange(e.target.value);
    };

    return (
        <select value={priority} onChange={handlePriorityChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    );
};

export default PriorityList;
