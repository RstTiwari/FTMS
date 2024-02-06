import {
    Form,
    Select,
    Divider,
    Space,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    InputNumber,
    Flex,
    Table,
} from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import QuotationForm from "Forms/QuotationForm";
import { epochInDDMMYY } from "Helper/EpochConveter";
import UpdateQuotationForm from "Forms/UpdateQuotationForm";

const UpdateQuotation = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [items,setItems] =useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [toUpdateObj, setToUpdateObj] = useState(false);
    const { entity, id } = useParams();
    const { readData, updateData } = useAuth();
    const [product, setProduct] = useState([]);
    const [count,setCount] = useState(0)

    const [formKey, setFormKey] = useState(0);
    const { getDropDownData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleDescriptionClick = async () => {
        let entity = "product";
        let fieldName = "productName";
        const dropDownData = await getDropDownData(entity, fieldName);
        setProduct(dropDownData);
    };
    const onDescriptionChange = (value, label) => {
        console.log(value, label);
    };
    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            address: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            address: value.shippingStreet,
            city: value.shippingCity,
            state: value.shippingState,
            pinCode: value.shippingPincode,
        };

        delete value.shippingStreet;
        delete value.shippingState;
        delete value.shippingCity;
        delete value.shippingPincode;
        delete value.billingStreet;
        delete value.billingState;
        delete value.billingCity;
        delete value.billingPincode;
        return { entity: entity, value };
    };

    const handleUpdateFormFinish = async (value) => {
        if (!toUpdateObj) {
            // checking if anything to update
            return NotificationHandler.error("Nothing to Update");
        }
        value._id = data._id;
        const { success, result, message } = await updateData(value);
        if (success) {
            return NotificationHandler.success(message);
        }
    };

    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
             result.quoteDate = epochInDDMMYY(result.quoteDate)
             result.quoteExpiryDate = epochInDDMMYY(result.quoteExpiryDate)
            setData(result);
            setIsLoading(false);
            setItems(result.items)
            setCount( result && result.items.length -1)
        
        }else{
            NotificationHandler.error("Failed to Fetch")
        }
    };
 

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                margin: "1.5rem 2rem",
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />
            {!isLoading && data && product ? (
                <>
                    <Header
                        title={` Update - ${entity} Details`}
                        subTitle={""}
                    />
                    <UpdateQuotationForm initialValues={data} id ={id}/>
{/* 
                    <Form
                        name="updateQuotation"
                        onFinish={(value) => handleUpdateFormFinish(value)} // Correct the function name here
                        initialValues={{
                            customer: data.customer.customerName,
                            quoteNo: data.quoteNo,
                            attenPerson: data.attenPerson,
                            grandTotal: data.grandTotal,
                            grossTotal: data.grossTotal,
                            items: data.items,
                            message: data.message,
                            quoteDate: epochInDDMMYY(data.quoteDate),
                            quoteExpiryDate: epochInDDMMYY(
                                data.quoteExpiryDate
                            ),
                            subject: data.subject,
                            taxPercent: data.taxPercent,
                            transPortAmount: data.transPortAmount,
                            validityCondition: data.validityCondition,
                            paymentsCondition: data.paymentsCondition,
                            installationCondition: data.installationCondition,
                            deliveryCondition: data.deliveryCondition,
                            facilityCondition: data.facilityCondition,
                            cancellationCondition: data.cancellationCondition,
                        }}
                    >
                        <div>
                            <Form.Item
                                label={"Select Customer"}
                                name={"customer"}
                                labelAlign="left"
                                labelCol={{ span: 6 }}
                                rules={[
                                    {
                                        required: "true",
                                        message: "Please Select Customer",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    dropdownRender={(menu) => {
                                        return (
                                            <div>
                                                {menu}
                                                <Divider />
                                                <Button
                                                    type="primary"
                                                    style={{
                                                        margin: "0.1rem",
                                                    }}
                                                >
                                                    Add New
                                                </Button>
                                            </div>
                                        );
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={"Quote#"}
                                name={"quoteNo"}
                                labelAlign="left"
                                labelCol={{ span: 6 }}
                                rules={[
                                    {
                                        required: "true",
                                        message: "Please Provide Quote No",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item
                                        label={"Quote Date"}
                                        name={"quoteDate"}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please Select Quote Date",
                                            },
                                        ]}
                                        labelAlign="left"
                                        labelCol={{ span: 12 }}
                                    >
                                        <DatePicker
                                            placeholder="Quote Date"
                                            format={"DD/MM/YY"}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item
                                        label={"Expiry Date"}
                                        name={"quoteExpiryDate"}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please Select Quote Expiry Date",
                                            },
                                        ]}
                                        labelAlign="left"
                                        labelCol={{ span: 6 }}
                                    >
                                        <DatePicker
                                            placeholder="Expiry Date"
                                            format={"DD/MM/YY"}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                label="Atten Per"
                                name={"attenPerson"}
                                labelAlign="left"
                                labelCol={{ span: 6 }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Sub"
                                name={"subject"}
                                labelAlign="left"
                                labelCol={{ span: 6 }}
                            >
                                <Input size="large" maxLength={100} />
                            </Form.Item>
                            <Form.Item
                                label="Message"
                                name={"message"}
                                labelAlign="left"
                                labelCol={{ span: 6 }}
                            >
                                <Input.TextArea style={{ width: "100%" }} />
                            </Form.Item>
                            <Divider dashed />
                            <Table
                                columns={TablOption}
                                dataSource={items}
                                pagination={false}
                            />
                            <Row justify={"center"}>
                                <Col span={24}>
                                    <Button
                                        type="primary"
                                        onClick={handleAddRow}
                                        icon={<PlusOutlined />}
                                        style={{
                                            marginBottom: "1rem",
                                            background: "green",
                                        }}
                                        block
                                    >
                                        Add Item
                                    </Button>
                                </Col>
                            </Row>
                            <Divider dashed />
                            <Row align={"middle"} justify={"end"}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Gross Total"
                                        name={"grossTotal"}
                                        labelAlign="center"
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            style={{ width: 150 }}
                                            controls={false}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row align={"middle"} justify={"end"}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Tax(%)"
                                        name={"taxPercent"}
                                        labelAlign="center"
                                    >
                                        <InputNumber style={{ width: 150 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row align={"middle"} justify={"end"}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Transport(Amount)"
                                        name={"transPortAmount"}
                                        labelAlign="center"
                                    >
                                        <InputNumber style={{ width: 150 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row align={"middle"} justify={"end"}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Grand Total"
                                        name={"grandTotal"}
                                        labelAlign="center"
                                    >
                                        <InputNumber
                                            readOnly
                                            style={{ width: 150 }}
                                            controls={false}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"center"} style={{ padding: "1rem" }}>
                                Term & Conditions
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Delivery"
                                        name={"deliveryCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Validity"
                                        name={"validityCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Payments"
                                        name={"paymentsCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Cancellation"
                                        name={"cancellationCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Installation"
                                        name={"installationCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"start"}>
                                <Col span={10}>
                                    <Form.Item
                                        label="Faciltity"
                                        name={"facilityCondition"}
                                    >
                                        <Input
                                            type="text"
                                            style={{
                                                width: inputWidth,
                                                fontSize: inputFontSize,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                        <Col className="gutter-row" span={6}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form> */}
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateQuotation;
