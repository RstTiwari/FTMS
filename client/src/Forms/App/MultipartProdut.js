import React, { useState } from 'react';
import { Form, Input, Select, Button, Collapse, InputNumber, Space, Row } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;

const MultipartProduct = () => {
    const [form] = Form.useForm();
    const [productCategory, setProductCategory] = useState('');

    const onCategoryChange = (value) => {
        setProductCategory(value);
    };

    const renderFormList = (name, label) => (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'id']}
                                fieldKey={[fieldKey, 'id']}
                                rules={[{ required: true, message: `Please select a ${label}` }]}
                            >
                                <Select placeholder={`Select ${label}`}>
                                    {/* Options would be dynamically loaded from the product list */}
                                    <Option value="1">{label} 1</Option>
                                    <Option value="2">{label} 2</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'quantity']}
                                fieldKey={[fieldKey, 'quantity']}
                                rules={[{ required: true, message: 'Please enter the quantity' }]}
                            >
                                <InputNumber placeholder="Quantity" min={1} />
                            </Form.Item>
                            <Button type="link" onClick={() => remove(name)}>Remove</Button>
                        </Space>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                        Add {label}
                    </Button>
                </>
            )}
        </Form.List>
    );

    const onFinish = (values) => {
        console.log('Form Values:', values);
        // Submit logic here
    };

    return (
        <div>
            
            <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item name="category" label="Product Category" rules={[{ required: true, message: 'Please select a product category' }]}>
                <Select placeholder="Select a category" onChange={onCategoryChange}>
                    <Option value="MultipartAssembly">Multipart Assembly</Option>
                    <Option value="SingleAssembly">Single Assembly</Option>
                    <Option value="Part">Part</Option>
                    <Option value="Hardware">Hardware</Option>
                </Select>
            </Form.Item>
            <Form.Item name="hsnCode" label="HSN Code" rules={[{ required: true, message: 'Please enter the HSN code' }]}>
                <Input placeholder="Enter HSN code" />
            </Form.Item>
            <Form.Item name="sellingPrice" label="Selling Price" rules={[{ required: true, message: 'Please enter the selling price' }]}>
                <InputNumber placeholder="Enter selling price" min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="buyingPrice" label="Buying Price" rules={[{ required: true, message: 'Please enter the buying price' }]}>
                <InputNumber placeholder="Enter buying price" min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="sku" label="SKU" rules={[{ required: true, message: 'Please enter the SKU' }]}>
                <Input placeholder="Enter SKU" />
            </Form.Item>
            <Form.Item name="unit" label="Unit of Measurement" rules={[{ required: true, message: 'Please select a unit' }]}>
                <Select placeholder="Select unit">
                    <Option value="pcs">Pcs</Option>
                    <Option value="kg">Kg</Option>
                    <Option value="m">Meters</Option>
                </Select>
            </Form.Item>

            {(productCategory === 'MultipartAssembly' || productCategory === 'SingleAssembly') && (
                <Collapse defaultActiveKey={['components', 'parts', 'hardware']}>
                    {productCategory === 'MultipartAssembly' && (
                        <Panel header="Components (Single Assembly)" key="components">
                            {renderFormList('components', 'Component')}
                        </Panel>
                    )}
                    <Panel header="Parts" key="parts">
                        {renderFormList('parts', 'Part')}
                    </Panel>
                    <Panel header="Hardware" key="hardware">
                        {renderFormList('hardware', 'Hardware')}
                    </Panel>
                </Collapse>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </div>
    );
};

export default MultipartProduct
