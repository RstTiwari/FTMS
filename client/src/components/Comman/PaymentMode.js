import React, { useEffect, useState } from "react";
import { Select, Button, Divider, Modal, Input, Row, Space } from "antd";
import { paymentMode } from "Data/PaymentReceivedData";
const PaymentMode = ({
    entity,
    entityName,
    width = "15vw",
    updateInForm,
    preFillValue,
}) => {
    const [value, setValue] = useState(preFillValue);


    useEffect(() => {
        if (preFillValue) {
            setValue(preFillValue);
        }
    }, [preFillValue]);

    const handleChange = (value) => {
        setValue(value);
        updateInForm(value);
    };

  

    return (
        <>
            <Select
                value={value ? value : ""}
                options={paymentMode}
                onChange={handleChange}
                style={{ width: width,textAlign:"left" }}

                getPopupContainer={(trigger) => document.body}
                dropdownStyle={{ position: "fixed", zIndex: 20000000 }}
                dropdownRender={(menu) => {
                    return (
                        <>
                            <div
                                style={{
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                            >
                                {menu}
                            </div>
                            <Divider
                                style={{
                                    margin: "8px 0",
                                }}
                            />
                            <Space
                                style={{
                                    padding: "0 8px 4px",
                                }}
                            ></Space>
                        </>
                    );
                }}
            />
        </>
    );
};

export default PaymentMode;
