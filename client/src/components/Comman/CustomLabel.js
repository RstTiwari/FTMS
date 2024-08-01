import React from 'react';

const CustomLabel = ({ label, required }) => {
    return (
        <span>
            <strong style={{ color: required ? "#EE4B2B" : 'black',fontFamily:"sans-serif" }}>
                {`${label} ${required ?"*":""}` }
            </strong>
        </span>
    );
};




export default CustomLabel;
