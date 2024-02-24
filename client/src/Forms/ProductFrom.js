import React from "react";
import { Form, Input, Button } from "antd";
import { Formik } from "formik";

const ProductForm = ({ onFormFinish, initalValue }) => {

    const handleSubmit = (values) => {
        // Handle form submission here
        onFormFinish(values);
    };
    const { name, price, hsnCode } = initalValue;
    return (
        <Formik
            initialValues={{ name: name, price: price, hsnCode: hsnCode }}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleSubmit }) => (
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        label="Product Name"
                        labelAlign="left"
                        labelCol={{span:6}}
                        name="productName"
                        rules={[
                            {
                                required: true,
                                message: "Please input the product name!",
                            },
                        ]}
                    >
                        <Input value={values.name} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        labelCol={{span:6}}
                        label="RATE"
                        name="rate"
                        rules={[
                            {
                                required: true,
                                message: "Please input the product price!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            value={values.price}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                      labelAlign="left"
                      labelCol={{span:6}}
                        label="HSN CODE"
                        name="hsnCode"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the product description!",
                            },
                        ]}
                    >
                        <Input
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
