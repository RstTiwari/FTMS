import React ,{useState}from "react";
import { Form, Input, Button, Row,Collapse ,Space,InputNumber} from "antd";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomModel from "components/CustomModal";
import CoustomButton from "components/Comman/CoustomButton";

const { Panel } = Collapse;


const ProductForm = ({
    form,
    onFormFinish,
    initalValue: initialValue,
    isModal,
}) => {
    const [productCategory, setProductCategory] = useState('');

    const handleImageUpdate = (file) => {

        form.setFieldsValue({ image: file });
    };
    const handelItemUpdate = (value, keyName,row) => {
        if (keyName === "code") {
            form.setFieldsValue({ code: value });
        }else if(keyName ==="category"){
            setProductCategory(value)
        }
    };

    const renderFormList = (name, label) => (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                        >
                            <Form.Item
                                {...restField}
                                name={[name, "id"]}
                                fieldKey={[fieldKey, "id"]}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please select a ${label}`,
                                    },
                                ]}
                            >
                                <CustomModel width={"30vw"}  entity={"product"}  entityName ="Product"/>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, "qty"]}
                                fieldKey={[fieldKey, "qty"]}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the qty",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Quantity"
                                    min={1}
                                    width={"30vw"}
                                    controls ={false}
                                />
                            </Form.Item>
                            <Button type="link" onClick={() => remove(name)}>
                                Remove
                            </Button>
                        </Space>
                    ))}
                    <CoustomButton text={`Add ${label}`}   onClick={() => add()} withIcon={true}  />

                </>
            )}
        </Form.List>
    );

    // const { name, price, hsnCode } = initalValue;
    return (
        <div>
            <FormItemCol
                label="Product Code"
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                name="code"
                width={"30vw"}
                type={"select"}
                entity={"Product Code"}
                entityName={"product"}
                updateInForm={(value) => handelItemUpdate(value, "code")}
                preFillValue={form.getFieldValue("code")}
            />
            <FormItemCol
                label="Product Name"
                labelAlign="left"
                required={true}
                width={"30vw"}
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
                width={"30vw"}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                label="Buying Price"
                name="purchaseRate"
                width={"30vw"}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                label="Selling Price"
                name="rate"
                required={true}
                width={"30vw"}
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
                label="Product Category"
                name="category"
                type={"category"}
                width={"30vw"}
                updateInForm={(value)=>handelItemUpdate(value,"category")}
            />

            <FormItemCol
                labelAlign="left"
                labelCol={{ span: isModal ? 18 : 8 }}
                label="Product Image"
                name="image"
                type={"image"}
                width={"30vw"}
                url={form.getFieldValue("image")}
                updateImageInForm={handleImageUpdate}
            />
              {(productCategory === 'multi_assembly' || productCategory === 'single_assembly') && (
                <Collapse defaultActiveKey={['components', 'parts', 'hardware']}>
                    {productCategory === 'multi_assembly' && (
                        <Panel header= {<Taglabel  text={"Assembly Components" }/>}key="components">
                            {renderFormList('components', 'Component')}
                        </Panel>
                    )}
                    <Panel header={<Taglabel  text={"Parts"}/>} key="parts">
                        {renderFormList('parts', 'Part')}
                    </Panel>
                    <Panel header={<Taglabel  text={"Hardware"}/>} key="hardware">
                        {renderFormList('hardware', 'Hardware')}
                    </Panel>
                </Collapse>
            )}
        </div>
    );
};

export default ProductForm;
