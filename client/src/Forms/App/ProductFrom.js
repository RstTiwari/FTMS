import React from "react";
import { Form, Input, Button } from "antd";
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
    const handelItemUpdate = (value, keyName) => {
        if (keyName === "code") {
            form.setFieldsValue({ code: value });
        }
    };

    // const { name, price, hsnCode } = initalValue;
    return (
        <div>
            <FormItemCol
                label="Product Code"
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                name="code"
                width={"15vw"}
                type={"select"}
                entity={"Product Code"}
                entityName={"product"}
                updateInform={(value) => handelItemUpdate(value, "code")}
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
                url={form.getFieldValue("image")}
                updateImageInForm={handleImageUpdate}
            />
        </div>
    );
};

export default ProductForm;
