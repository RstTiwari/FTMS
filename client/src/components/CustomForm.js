import React, { useState, useEffect } from "react";
import { Form } from "antd";
import Header from "./Header";
import FormActionButtons from "../components/SmallComponent/FormActionButton";
import CustomFormItem from "../module/Create/CreateModule";

import "../App.css"

const CustomForm = ({ entity }) => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        // Fetch initial values based on the entity
        setInitialValues({ customerName: "Rohit" });
    }, [entity]);

    const handleFormFinish = (values) => {
        console.log("Form submitted:", values);
        // Handle form submission logic
    };
   

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header onlyTitle={true} />
            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={initialValues}
                onFinish={handleFormFinish}
                className="form-with-fixed-actions"
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        marginTop:"10px"
                    }}
                >
                    <CustomFormItem entity={entity} form={form} />
                </div>
                <div
                    style={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "#ffffff",
                        padding: "5px",
                        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                    }}
                >
                    <FormActionButtons isUpdating={false} />
                </div>
            </Form>
        </div>
    );
};

export default CustomForm;
