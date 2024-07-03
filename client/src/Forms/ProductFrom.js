import React from "react";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";
import FormItemCol from "components/SmallComponent/FormItemCol";

const ProductForm = ({ onFormFinish, initalValue }) => {
    const handleSubmit = (values) => {
        // Handle form submission here
        onFormFinish(values);
    };
    // const { name, price, hsnCode } = initalValue;
    return (
        <div style={{ height: "100vh" }}>
            <FormItemCol
                label="Product Code"
                labelAlign="left"
                labelCol={{ span: 6 }}
                name="code"
                type={"select"}
                entity ={"Product Code"}
              
            
            />
            <FormItemCol
                label="Product Name"
                labelAlign="left"
                required={true}
                labelCol={{ span: 6 }}
                name="productName"
                type={"input"}
                rules={[
                    {
                        required: true,
                        message: "Please input the product name!",
                    },
                ]}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: 6 }}
                label="HSN CODE"
                name="hsnCode"
                type={"input"}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: 6 }}
                label="Selling Price"
                name="rate"
                required={true}
                rules={[
                    {
                        required: true,
                        message: "Please input the product price!",
                    },
                ]}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: 6 }}
                label="Product Image"
                name="image"
                type={"image"}
                url =""
                onUploadSuccess={(result) => console.log('Upload success:', result)}
               
            />
        </div>
    );
};

export default ProductForm;
