import React from 'react';

const CustomLabel = ({ label, required }) => {
    return (
        <span>
            <strong style={{ color: required ? 'red' : 'black',fontFamily:"sans-serif" }}>
                {label}
            </strong>
        </span>
    );
};




export default CustomLabel;
