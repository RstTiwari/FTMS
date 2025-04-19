import React from 'react'
import Taglabel from './Taglabel'

const ShowEntityNo = ({prefix, no, suffix}) => {
    let text = `${prefix ? prefix + "-" : ""}${no}${suffix ? suffix : ""}`;
    console.log(text,"=text")
    return <Taglabel type="no" text={text} />;
};

export default ShowEntityNo
