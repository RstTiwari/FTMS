import React from "react";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";
import FormItemCol from "components/Comman/FormItemCol";

const ProductForm = ({
    form,
    onFormFinish,
    initalValue: initialValue,
    isModal,
}) => {
    const handleSubmit = (values) => {
        // Handle form submission here
        onFormFinish(values);
    };
    const handleImageUpdate = (file) => {
        form.setFieldsValue({ image: file });
    };

    // const { name, price, hsnCode } = initalValue;
    return (
        <div style={{ height: "100vh" }}>
            <FormItemCol
                label="Product Code"
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                name="code"
                type={"select"}
                entity={"Product Code"}
            />
            <FormItemCol
                label="Product Name"
                labelAlign="left"
                required={true}
                labelCol={{ span: isModal ? 18 : 8 }}
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
                labelCol={{ span: isModal ? 18 : 8 }}
                label="HSN CODE"
                name="hsnCode"
                type={"input"}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
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
                labelCol={{ span: isModal ? 18 : 8 }}
                label="Product Image"
                name="image"
                type={"image"}
                url=""
                updateImageInForm={handleImageUpdate}
            />
        </div>
    );
};

export default ProductForm;
