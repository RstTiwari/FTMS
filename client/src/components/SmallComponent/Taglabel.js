import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

// Define a mapping of types to colors
const typeColorMapping = {
  heading: '#000000',
  amount: '#00b700',
  text:"#7f7f7f",
  no: ' #7f7fff',
  customer: '#E59400',
  status: '#7feaac', // Default color
};

const Taglabel = ({
    type,
    text,
    details,
    weight = 700,
}) => {

    // Use the color based on the type if not provided
    const textColor =  typeColorMapping[type]

    return (
        <Text
            style={{
                fontFamily: "sans-serif",
                fontWeight: weight,
                fontSize:details ? "0.65rem":"0.9rem",
                color: textColor,
            }}
        >
            {text ||  ""}
        </Text>
    );
};

export default Taglabel;
